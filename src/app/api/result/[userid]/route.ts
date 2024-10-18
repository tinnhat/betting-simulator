import { sql, db } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(nextRequest: NextRequest, { params }: { params: { userid: number } }) {
  try {
    const result = await sql`SELECT * FROM "result" as r JOIN "bet" as b on r.id = b.resultid where b.userid = ${params.userid} Order by b.create_time desc`;
    // const result = await sql`UPDATE "Users" SET money = 2000000`
    return NextResponse.json({ result: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error connecting to database:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
