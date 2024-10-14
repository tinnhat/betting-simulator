"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Modal from "../Modal";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { dataMock } from "./mockData";
import {
  BookmakerInfo,
  MarketsInfo,
  MatchInfo,
  OddBet,
  OutComes,
} from "@/app/types";

type Props = {};
export default function Bet({}: Props) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [matchs, setMatchs] = useState<MatchInfo[]>([]);
  const [position, setPosition] = useState(0);
  const [matchShow, setMatchShow] = useState<MatchInfo>({} as MatchInfo);
  const [oddChoose, setOddChoose] = useState<OddBet>({} as OddBet);
  const getMatchComing = async () => {
    try {
      // const response = await fetch(
      //   `https://api.the-odds-api.com/v4/sports/soccer_epl/events?apiKey=${process.env.NEXT_PUBLIC_THE_ODDS_API_KEY}`
      // )
      // const result = await response.json()
      // const listMatch = result.filter(
      //   (item: MatchInfo) =>
      //     item.home_team.toLowerCase() === teamChoose.toLowerCase() ||
      //     item.away_team.toLowerCase() === teamChoose.toLowerCase()
      // )
      // console.log(listMatch);
      const listMatch: MatchInfo[] = [
        {
          id: "08a9e3241c27d9fbb3aa3f1950527c63",
          sport_key: "soccer_epl",
          sport_title: "EPL",
          commence_time: "2024-10-20T13:00:00Z",
          home_team: "Wolverhampton Wanderers",
          away_team: "Manchester City",
        },
        {
          id: "9427f05d52b3b209f92f465b6acda0d1",
          sport_key: "soccer_epl",
          sport_title: "EPL",
          commence_time: "2024-10-26T14:00:00Z",
          home_team: "Manchester City",
          away_team: "Southampton",
        },
      ];

      const matchChoose = listMatch[0];
      matchChoose.img_home = await getImageBadgeTeam(matchChoose.home_team);
      matchChoose.img_away = await getImageBadgeTeam(matchChoose.away_team);

      getImageBadgeTeam(matchChoose.away_team);
      setMatchs(listMatch);
      setPosition(0);
      //call api get image

      setMatchShow(matchChoose);
    } catch (error) {
      console.log(error);
      toast({
        title: "Get match",
        description: "Error when fetching match",
        duration: 2000,
      });
    }
  };

  const getImageBadgeTeam = async (team: string) => {
    let image: string = "";
    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${team}`
      );
      const result = await response.json();
      if (result.teams === null) return "";
      image = result.teams[0].strBadge;
    } catch (error) {
      console.log(error);
    }
    return image;
  };

  useEffect(() => {
    getMatchComing();
  }, []);

  useEffect(() => {
    if (matchs.length > 0) {
      (async () => {
        const matchFind = matchs[position];
        matchFind.img_home = await getImageBadgeTeam(matchFind.home_team);
        matchFind.img_away = await getImageBadgeTeam(matchFind.away_team);
        setMatchShow(matchs[position]);
      })();
    }
  }, [position]);

  const handleNextMatch = () => {
    setPosition((prev) => prev + 1);
  };

  const handlePrevMatch = () => {
    setPosition((prev) => prev - 1);
  };

  const handleChooseBet = (
    home_team: string,
    away_team: string,
    odd: string,
    rate: number,
    teamChoose: string,
    eventid_oddsapi: string,
    market: string,
    league: string,
    time: string
  ) => {
    let homeTeam = "";
    let awayTeam = "";
    switch (teamChoose) {
      case "Draw":
        homeTeam = "Draw";
        awayTeam = "Draw";
        break;
      default:
        homeTeam = home_team === teamChoose ? home_team : "";
        awayTeam = away_team === teamChoose ? away_team : "";
        break;
    }
    //check over/ under
    if (teamChoose.includes("Over") || teamChoose.includes("Under")) {
      homeTeam = teamChoose;
      awayTeam = teamChoose;
    }
    setOddChoose({
      market,
      odd,
      money_bet: 0,
      home_team: homeTeam,
      away_team: awayTeam,
      rate,
      eventid_oddsapi,
      league,
      date_of_match: time,
    });
    setIsOpen(true);
  };

  return (
    <>
      <div className="w-3/5 bg-slate-800 rounded-md min-h-full">
        <div className="p-4 flex flex-col items-center justify-between">
          <div className="flex gap-10 items-center justify-between w-full">
            {matchs.length > 0 && (
              <Button disabled={position === 0} onClick={handlePrevMatch}>
                Prev
              </Button>
            )}
            <h1 className="text-green-600 font-bold text-center">Match day</h1>
            {matchs.length > 0 && (
              <Button
                disabled={position === matchs.length - 1}
                onClick={handleNextMatch}
              >
                Next
              </Button>
            )}
          </div>

          <div className="flex gap-10 items-center justify-between mt-4 w-full">
            {/* team 1 */}
            <div className="w-2/5 text-center flex flex-col justify-center items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={matchShow?.img_home}
                  alt={matchShow?.home_team}
                />
                <AvatarFallback>{matchShow?.home_team}</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-blue-400 font-bold">
                {matchShow?.home_team} (H)
              </p>
            </div>
            <div className="w-1/5 text-center">
              <p>
                {new Date(matchShow?.commence_time).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="w-2/5 text-center flex flex-col justify-center items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={matchShow?.img_away}
                  alt={matchShow?.away_team}
                />
                <AvatarFallback>{matchShow?.away_team}</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-blue-400 font-bold">
                {matchShow?.away_team}
              </p>
            </div>
          </div>
          {/* odds */}
          <p className="text-green-600 font-bold mt-6">Odds</p>
          <div className="mt-6 w-full max-h-64 overflow-auto">
            <ul className="flex flex-col gap-2">
              {dataMock.bookmakers.map((item: BookmakerInfo) => (
                <>
                  <li className="w-full" key={item.key}>
                    <h6 className="text-blue-600 font-bold text-sm">
                      {item.title}
                    </h6>
                    {item.markets.map((market: MarketsInfo, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center w-full mt-2"
                      >
                        <div className="w-1/6 text-sm">
                          Odd:{" "}
                          <span className="font-bold">
                            {market.key.toUpperCase()}
                          </span>
                        </div>
                        <div className="w-5/6 flex justify-between items-center text-sm text-gray-200">
                          {market.outcomes.map(
                            (outcome: OutComes, index: number) => (
                              <div key={index} className="w-1/3 text-center">
                                <p className="whitespace-nowrap">
                                  {outcome.name}{" "}
                                  {outcome.point && (
                                    <span className="text-red-500">
                                      ({outcome.point})
                                    </span>
                                  )}
                                  <span
                                    onClick={() =>
                                      handleChooseBet(
                                        dataMock.home_team,
                                        dataMock.away_team,
                                        market.key,
                                        outcome.price,
                                        `${outcome.name}${outcome.point ?? ""}`,
                                        dataMock.id,
                                        item.key,
                                        dataMock.sport_title,
                                        dataMock.commence_time
                                      )
                                    }
                                    className="text-green-400 cursor-pointer hover:text-green-200 transition-colors duration-300 ml-4"
                                  >
                                    {outcome.price}
                                  </span>
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </li>
                  <hr className="my-4 border-gray-400" />
                </>
              ))}
            </ul>
          </div>
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} oddChoose={oddChoose} />
        )}
      </div>
    </>
  );
}
