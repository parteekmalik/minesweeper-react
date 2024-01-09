"use client";

import React, { useEffect, useState } from "react";
import Minesweeper, { tile } from "./classes/minesweeper";
import Board from "./boad";
import { checkForValidClick } from "./helper/getPos";
import _ from "lodash";

function Game() {
  const [game, setGame] = useState(
    new Minesweeper({ row: 20, col: 30, bombs: 120 }),
  );
  useEffect(() => {
    console.log(game);
  }, [game]);
  function clickHandle(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const { row, col } = checkForValidClick(e);
    console.log(e.nativeEvent.button);
    if ((game.boardtile()[row] as tile[])[col] === "revealed") return;
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
    // className="scale-[2]"
    >
      <Board
        board={game.board()}
        boardtile={game.boardtile()}
        clickHandle={clickHandle}
      ></Board>
    </div>
  );
}
export default Game;
