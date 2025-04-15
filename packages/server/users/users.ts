import { NAMES } from '../constants'
import { Core } from '../core/core'

import type { PRNG } from 'seedrandom'

/**
 * Interface representing a user with an id and name.
 */
export interface User {
  /**
   * User ID.
   */
  id: number
  /**
   * User Name.
   */
  name: string
}

/**
 * Class responsible for managing user-related operations.
 */
class UserManager extends Core {
  // Starting ID for users.
  private static readonly ID_START = 100
  // Total number of users to generate.
  private static readonly USERS_COUNT = 20
  // Array to store the list of users.
  private users: User[] = []
  // Set to track selected names and ensure uniqueness.
  private selectedNames: Set<string> = new Set()

  /**
   * Initializes the UserManager by generating a list of unique users.
   */
  constructor() {
    super()
    this.generateUsers()
  }

  /**
   * Generates a list of unique users by combining first and last names.
   * Ensures that each user has a unique full name.
   */
  private generateUsers(): void {
    // Continue generating users until the desired count is reached.
    while (this.users.length < UserManager.USERS_COUNT) {
      // Randomly select a first name from the list.
      const firstName = this.getRandomElement(NAMES.first)
      // Randomly select a last name from the list.
      const lastName = this.getRandomElement(NAMES.last)
      // If either name is undefined, skip this iteration.
      if (!firstName || !lastName) continue

      // Combine the first and last names to form the full name.
      const fullName = `${firstName} ${lastName}`

      // If the full name has already been selected, skip to the next iteration.
      if (this.selectedNames.has(fullName)) continue

      // Calculate the user's ID based on the starting ID and current count.
      const id = UserManager.ID_START + this.users.length
      // Add the new user to the user's array.
      this.users.push({ id, name: fullName })
      // Add the full name to the set of selected names to ensure uniqueness.
      this.selectedNames.add(fullName)
    }
  }

  /**
   * Retrieves the list of all users.
   * @returns An array of User objects.
   */
  public getAllUsers(): User[] {
    // Return a shallow copy of the users array to prevent external modifications.
    return [...this.users]
  }

  /**
   * Validates whether a given user object matches a user in the list.
   * @param user - The user objects to validate.
   * @returns True if the user is valid; otherwise, false.
   */
  public isValidUser(user: unknown): user is User {
    if (this.isUserType(user)) {
      // Calculate the index based on the user's id and starting ID.
      const index = user.id - UserManager.ID_START
      // Retrieve the expected user from the user's array.
      const expectedUser = this.users[index]
      // Check if the expected user exists and the names match.
      return expectedUser !== undefined && expectedUser.name === user.name
    }
    // If any check fails, 'obj' does not conform to the 'User' interface
    return false
  }

  /**
   * Type guard to determine if an object adheres to the User interface.
   * @param obj - The object to evaluate.
   * @returns True if the object matches the User structure; otherwise, false.
   */
  private isUserType(obj: unknown): obj is User {
    // Check if obj is an object and not null
    if (typeof obj !== 'object' || obj === null) {
      return false
    }

    // Define an array of property names and their expected types
    const properties: { key: keyof User; type: string }[] = [
      { key: 'id', type: 'number' },
      { key: 'name', type: 'string' },
    ]

    // Iterate over the properties to check for existence and type
    for (const prop of properties) {
      // Use the 'in' operator to check if the property exists in the object
      if (!(prop.key in obj)) {
        return false
      }
      // Check the type of the property
      if (typeof (obj as Record<string, unknown>)[prop.key] !== prop.type) {
        return false
      }
    }

    // All checks passed; obj matches the User interface
    return true
  }

  /**
   * Selects a random pair of distinct users from the list.
   * @param prng - The seeded PRNG to use for randomness.
   * @returns A tuple containing two unique User objects.
   */
  public pickUsers(prng: PRNG): [User, User] {
    // Pick 2 random different random users
    const user1 = this.seededSample(prng, this.users)
    const user2 = this.pickDifferentUser(prng, user1)

    // Return the users as an array.
    return [user1, user2]
  }

  /**
   * Selects a different user from the list that is different from the given user.
   * @param prng - The seeded PRNG to use for randomness.
   * @param user - The user to exclude from the selection.
   * @return A User object that is different from the given user.
   * @private
   */
  private pickDifferentUser(prng: PRNG, user: User): User {
    // Select a different user from the list.
    const differentUser = this.seededSample(prng, this.users)

    // When the selected user is the same as the given user, pick again.
    if (differentUser.id === user.id) {
      return this.pickDifferentUser(prng, user)
    }

    // Otherwise, return the different user.
    return differentUser
  }
}

// Create a singleton instance of the UserManager.
const Users = Object.freeze(new UserManager())

// Export an instance of UserManager.
export { Users }
