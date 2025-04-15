import seedrandom from 'seedrandom'

import { Users } from './users'

describe('UserManager', () => {
  const nowMS: Date = new Date()
  const epochSeconds: number = Math.round(nowMS.getTime() / 1000)
  const prng = seedrandom(epochSeconds.toString())

  it('should generate 20 users', () => {
    // Act
    const users = Users.getAllUsers()

    // Assert
    expect(users).toHaveLength(20)
  })

  it('should pick 2 random users', () => {
    // Pick 2 random users
    const users = Users.pickUsers(prng)

    // Check that we get 2 users.
    expect(users).toHaveLength(2)

    // Deconstruct the users
    const [user1, user2] = users

    // Check that the users are different
    expect(user1).not.toMatchObject(user2)
  })

  it('should be valid user', () => {
    // Act
    const [randomUser] = Users.pickUsers(prng)
    const user = Users.isValidUser(randomUser)

    // Assert
    expect(user).toBeTruthy()
  })

  it('should be invalid user', () => {
    // Act
    const user = Users.isValidUser({
      id: 99,
      name: 'John Doe',
    })

    // Assert
    expect(user).toBeFalsy()
  })
})
