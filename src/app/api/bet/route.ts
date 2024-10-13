import { loggingInformation } from "@/lib/utils";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      home_team,
      away_team,
      odd,
      rate,
      money_bet,
      eventid_oddsapi,
      league,
      date_of_match,
      userid,
    } = await req.json();
    // Start a transaction
    await sql`BEGIN`;
    try {
      // Step 0: Check if user exists
      const userExist =
        await sql`SELECT * FROM "users" WHERE "userid" = ${userid}`;
      if (userExist.rows.length === 0) {
        loggingInformation(`User not found: userid: ${userid}`, "error");
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      else {
        //update new money
        const newMoney = userExist.rows[0].money - money_bet;
        if(newMoney < 0) {
          loggingInformation(`User enough money`, "error");
          return NextResponse.json(
            { message: "User enough money" },
            { status: 406 } //not acceptable
          );
        }
        await sql`UPDATE "users" SET "money" = ${newMoney} WHERE "userid" = ${userid}`;
        loggingInformation(`Update money user bet success`, "info");
      }
      // Step 1: Insert into Table result and get the new ID
      const insertTableResult: QueryResult<QueryResultRow> = await sql`
          INSERT INTO "result" ("team_win","team_lose","win_score","lose_score","league", "date_of_match")
          VALUES (null,null, 0,0,${league}, ${date_of_match})
          RETURNING *;
        `;
      loggingInformation(
        `insert table result success: ${insertTableResult.rows[0]}`,
        "info"
      );
      // Step 2: Insert into table bet
      const currentDate = new Date();
      const newId = insertTableResult.rows[0]?.id;
      const insertTableBet = await sql`
          INSERT INTO "bet" ("create_time","home_team","away_team","odd","rate","money_bet","eventid_oddsapi","userid","resultid")
          VALUES (${currentDate.toISOString()},${home_team},${away_team},${odd},${rate},${money_bet},${eventid_oddsapi},${userid},${newId})
          RETURNING *;
        `;
      loggingInformation(
        `insert table bet success: ${insertTableBet.rows[0]}`,
        "info"
      );
      // Commit the transaction
      await sql`COMMIT`;
      loggingInformation("Add bet success", "");
      return NextResponse.json({ message: "Add bet success" }, { status: 200 });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await sql`ROLLBACK`;
      loggingInformation(`Add bet failed: ${error}`, "error");
      loggingInformation(`Rollback success`, "info");
      return NextResponse.json({ message: "Add bet failed" }, { status: 500 });
    }
  } catch (error) {
    loggingInformation(`Error: ${error}`, "error");
    return NextResponse.json({ error }, { status: 500 });
  }
}
