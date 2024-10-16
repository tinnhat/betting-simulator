import { sql, db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const result = await sql`SELECT * FROM "result" as r JOIN "bet" as b on r.id = b.resultid`;
    // const result = await sql`UPDATE "Users" SET money = 2000000`
    return NextResponse.json({ result: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error connecting to database:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
export const revalidate = 0;