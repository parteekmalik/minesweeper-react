import React, { useEffect, useRef, useState } from "react";
import { piece, tile } from "./classes/minesweeper";
import BoardPieces from "./boardPieces";

function Board(props: {
  board: piece[][];
  boardtile: tile[][];
  clickHandle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  const { board, boardtile, clickHandle } = props;
  const [clickdown, setclickdown] = useState(false);
  return (
    <div
      className="flex select-none flex-col"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex ">
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornertopleft.png')]" />
        {(board[0] as piece[]).map((_, i) => {
          return (
            <div
              className="h-[10px] w-[20px] bg-[url('/borders/boarderflat.png')]"
              key={"bordertop" + i}
            />
          );
        })}
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornertopright.png')]" />
      </div>
      <div className="flex">
        <div className="h-[30px] w-[10px] bg-[url('/borders/boarder.png')]" />
        <div className="grow bg-[#b7b7b7]  ">
          <div className="flex h-full items-center justify-center">
            <div
              className={`h-[26px] w-[26px] ${
                clickdown
                  ? "bg-[url('/mine/click.PNG')]"
                  : "bg-[url('/mine/happy.PNG')]"
              }`}
            />
          </div>
        </div>
        <div className="h-[30px] w-[10px] bg-[url('/borders/boarder.png')]" />
      </div>
      <div className="flex ">
        <div className="h-[10px] w-[10px] bg-[url('/borders/cornermidleft.png')]" />
        {(board[0] as piece[]).map((_, i) => {
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
          {board.map((_, i) => {
            return (
              <div
                className="h-[20px]  w-[10px] bg-[url('/borders/boarder.png')]"
                key={"bordertop" + i}
              />
            );
          })}
        </div>
        <BoardPieces
          board={board}
          boardtile={boardtile}
          clickHandle={clickHandle}
          setclickdown={setclickdown}
        />
        <div className="flex flex-col">
          {board.map((_, i) => {
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
        {(board[0] as piece[]).map((_, i) => {
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

export default Board;
