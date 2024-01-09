import React, { Dispatch, SetStateAction } from "react";
import { piece, tile } from "./classes/minesweeper";

function BoardPieces(props: {
  board: piece[][];
  boardtile: tile[][];
  clickHandle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  setclickdown: Dispatch<SetStateAction<boolean>>;
}) {
  const { board, boardtile, clickHandle, setclickdown } = props;

  return (
    <div
      className="flex flex-col"
      onMouseUp={(e) => {
        setclickdown(false);
        clickHandle(e);
      }}
      onMouseDown={() => setclickdown(true)}
    >
      {board.map((row, y) => {
        return (
          <div className="flex" key={y}>
            {row.map((val, x) => {
              function getIMGURL(x: tile) {
                switch (x) {
                  case "none":
                    return `url(${"/mine/" + x + ".jpg"})`;
                  case "flag":
                    return `url(${"/mine/" + x + ".png"})`;
                  case "revealed":
                    return `url(${"/mine/" + val + ".png"})`;
                  default: {
                    return x;
                  }
                }
              }
              const imageURL = getIMGURL((boardtile[y] as tile[])[x] as tile);
              return (
                <div
                  className="h-[20px] w-[20px]"
                  key={y + "," + x}
                  id={y + "," + x}
                  style={{
                    backgroundImage: imageURL,
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default BoardPieces;
