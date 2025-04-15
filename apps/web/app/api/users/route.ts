import { Users } from '@packages/server/users'
import { NextResponse } from 'next/server'

/**
 * Users GET route.
 * @constructor
 */
export function GET() {
  return NextResponse.json({ data: Users.getAllUsers() })
}
