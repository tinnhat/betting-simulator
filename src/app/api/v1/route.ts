import { sql, db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await sql`SELECT * FROM "users"`;
    // const result = await sql`UPDATE "Users" SET money = 2000000`
    return NextResponse.json({ result: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error connecting to database:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
export const revalidate = 0;
/*
This export sets the revalidation behavior for this route. Setting it to 0 means:
For static rendering: The page will be generated on every request, effectively making it dynamic.
For server-side rendering: The page will not be cached and will be regenerated on every request.
By setting revalidate to 0, you're ensuring that this API route always returns fresh data and is never cached.
*/