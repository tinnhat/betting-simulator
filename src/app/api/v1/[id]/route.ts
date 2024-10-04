import { sql, db } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'



export async function GET(nextRequest: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const result = await sql`SELECT * FROM "Users" where "userId" = ${id}`;
    return NextResponse.json({ result: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error connecting to database:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
