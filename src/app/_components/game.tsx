"use client";

import React, { useEffect, useState } from "react";
import Minesweeper, { piece, tile } from "./classes/minesweeper";
import { checkForValidClick } from "./helper/getPos";
import _ from "lodash";
import BoardPieces from "./boardPieces";
import DisplayNumber from "./displayNumber";
import moment from "moment";

function Game() {
  const [game, setGame] = useState(
    new Minesweeper({ row: 20, col: 30, bombs: 10 }),
  );
  const [clickdown, setclickdown] = useState(false);

  const [time, setTime] = useState(0);
  // triggering react rerender
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().toDate().getTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(game);
  }, [game]);

  function clickHandle(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const { row, col } = checkForValidClick(e);
    console.log(e.nativeEvent.button);
    if ((game.boardtile()[row] ?? [])[col] === "revealed") return;
    const Game = _.cloneDeep(game);
    if (e.nativeEvent.button === 0) {
      Game.reveal({ row, col });
    } else if (e.nativeEvent.button === 2) {
      Game.flag({ row, col });
    }
    setGame(Game);
    console.log(row, col);
  }
  return (
    <div
      className="flex select-none flex-col"
      onContextMenu={(e) => e.preventDefault()}
    >
      {game.isOver()}
      <div className="flex ">
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornertopleft.png')]" />
        {game.board()[0]!.map((_, i) => {
          return (
            <div
              className="h-[10px] w-[20px] bg-[url('/borders/boarderflat.png')]"
              key={"bordertop" + i}
            />
          );
        })}
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornertopright.png')]" />
      </div>
      <div className="flex  bg-[#b7b7b7]  ">
        <img
          draggable={false}
          src="/borders/boarder.png"
          className="h-full w-[10px]"
        />
        <div className="flex w-full justify-between p-2 ">
          <DisplayNumber
            time={
              game.flagLeft() < 0 || game.flagLeft() > 999 ? 0 : game.flagLeft()
            }
          />
          <div className="flex h-full items-center justify-center">
            <img
              draggable={false}
              className={`$ h-full`}
              src={clickdown ? "/mine/click.PNG" : "/mine/happy.PNG"}
              onMouseUp={(e) => {
                const Game = _.cloneDeep(game);
                Game.reset();
                setGame(Game);
              }}
            />
          </div>
          <DisplayNumber
            time={Math.floor(
              (moment().toDate().getTime() - game.startTime()) / 1000,
            )}
          />
        </div>
        <img
          draggable={false}
          src="/borders/boarder.png"
          className="h-full w-[10px]"
        />
      </div>
      <div className="flex ">
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornermidleft.png')]" />
        {game.board()[0]!.map((_, i) => {
          return (
            <div
              className="h-[10px] w-[20px] bg-[url('/borders/boarderflat.png')]"
              key={"bordertop" + i}
            />
          );
        })}
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornermidright.png')]" />
      </div>
      <div className="flex">
        <div className="flex flex-col">
          {game.board().map((_, i) => {
            return (
              <div
                className="h-[20px]  w-[10px] bg-[url('/borders/boarder.png')]"
                key={"bordertop" + i}
              />
            );
          })}
        </div>
        <BoardPieces
          board={game.board()}
          boardtile={game.boardtile()}
          clickHandle={clickHandle}
          setclickdown={setclickdown}
        />
        <div className="flex flex-col">
          {game.board().map((_, i) => {
            return (
              <div
                className="h-[20px] w-[10px] bg-[url('/borders/boarder.png')]"
                key={"bordertop" + i}
              />
            );
          })}
        </div>
      </div>
      <div className="flex ">
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornerdownleft.png')]" />
        {game.board()[0]!.map((_, i) => {
          return (
            <div
              className="h-[10px] w-[20px] bg-[url('/borders/boarderflat.png')] "
              key={"bordertop" + i}
            />
          );
        })}
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornerdownright.png')]" />
      </div>
    </div>
  );
}
export default Game;
