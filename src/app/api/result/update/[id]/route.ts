import { loggingInformation } from '@/lib/utils'
import { sql, db } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
    nextRequest: NextRequest,
    { params }: { params: { id: number } }
  ) {
    try {
      const {
        team_win,
        team_lose,
        win_score,
        lose_score,
        money_bet,
        money_result,
        userid,
      } = await nextRequest.json()
      //check result avalable
      const result = await sql`SELECT * FROM "result" WHERE "id" = ${params.id}`
      if (result.rows.length === 0) {
        loggingInformation('Result not found', 'error')
        return NextResponse.json({ message: 'Result not found' }, { status: 404 })
      }
      //check user exist
      const userExist = await sql`SELECT * FROM "users" WHERE "userid" = ${userid}`
      if (userExist.rows.length === 0) {
        loggingInformation('User not found', 'error')
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }
      //update result
      await sql`BEGIN`
      await sql`UPDATE "result" SET "team_win" = ${team_win}, "team_lose" = ${team_lose}, "win_score" = ${win_score}, "lose_score" = ${lose_score}, "money_result" = ${money_result}, "league" = ${result.rows[0].league}, "date_of_match" = ${result.rows[0].date_of_match} WHERE "id" = ${params.id}`
      //add or remove money
      if (money_result === 0) {
        //lose
        const newMoney = Number(userExist.rows[0].money) - Number(money_bet)
        await sql`UPDATE "users" SET "money" = ${newMoney} WHERE "userid" = ${userid}`
        loggingInformation('Minus money bet success', '')
      } else {
        //win
        const newMoney = Number(userExist.rows[0].money) + Number(money_result)
        await sql`UPDATE "users" SET "money" = ${newMoney} WHERE "userid" = ${userid}`
        loggingInformation('Add money bet success', '')
      }
      await sql`COMMIT`
      loggingInformation('Update result success', '')
      return NextResponse.json({ result: 'Update result success' }, { status: 200 })
    } catch (error) {
      await sql`ROLLBACK`;
      loggingInformation(`Update result failed: ${error}`, "error");
      loggingInformation(`Rollback success`, "info");
      console.error('Error connecting to database:', error)
      return NextResponse.json({ error }, { status: 500 })
    }
  }