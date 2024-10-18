import { loggingInformation } from '@/lib/utils'
import { sql, db } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { userid } = await req.json()
    //check first if bet exist
    const result = await sql`SELECT * FROM "bet" WHERE "id" = ${params.id}`
    if (result.rows.length === 0) {
      loggingInformation('Bet not found', 'error')
      return NextResponse.json({ message: 'Bet not found' }, { status: 404 })
    }
    //check date
    const dateOfMatch = new Date(result.rows[0].date_of_match)
    const today = new Date()
    if (dateOfMatch < today) {
      loggingInformation('Bet cannot delete because date is expired', 'error')
      return NextResponse.json(
        { message: 'Bet cannot delete because date is expired' },
        { status: 404 }
      )
    }
    await sql`BEGIN`
    // add money to account
    const moneyBet = result.rows[0].money_bet
    const userExist =
      await sql`SELECT * FROM "users" WHERE "userid" = ${userid}`
    if (userExist.rows.length === 0) {
      loggingInformation('User not found', 'error')
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    const newMoney =  Number(userExist.rows[0].money) + Number(moneyBet)
    
    await sql`UPDATE "users" SET "money" = ${newMoney} WHERE "userid" = ${userid}`
    //delete in table result (FK)
    await sql`DELETE FROM "result" WHERE "id" = ${result.rows[0].resultid}`
    //delete in table bet
    await sql`DELETE FROM "bet" WHERE "id" = ${params.id}`
    await sql`COMMIT`
    loggingInformation('Remove bet success', '')
    return NextResponse.json({ message: 'Remove bet success' }, { status: 200 })
  } catch (error) {
    console.error('Error connecting to database:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
