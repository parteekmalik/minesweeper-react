import moment from "moment";
import Queue from "./queue";

export type piece = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type tile = "none" | "flag" | "revealed" | "minered";
function init2dArray<T>(
  X: T,
  { row, col }: { row: number; col: number },
): T[][] {
  const board: T[][] = [];

  for (let i = 0; i < row; i++) {
    const row: T[] = [];

    for (let j = 0; j < col; j++) {
      row.push(X);
    }

    board.push(row);
  }

  return board;
}
function abs(x: number) {
  if (x < 0) return x * -1;
  return x;
}
function checksurrounding({
  clickLoc,
  position,
}: {
  clickLoc: { row: number; col: number };
  position: { row: number; col: number };
}) {
  if (
    abs(clickLoc.row - position.row) > 2 ||
    abs(clickLoc.col - position.col) > 2
  )
    return false;

  const checkin = [clickLoc];
  surroudingPos.forEach((dif, i) => {
    checkin.push({ row: clickLoc.row + dif.row, col: clickLoc.col + dif.col });
  });

  let found = false;
  checkin.forEach((pos) => {
    if (pos.row === position.row && pos.col === position.col) found = true;
  });

  return found;
}
const surroudingPos = [
  { row: 0, col: -1 },
  { row: 0, col: +1 },
  { row: -1, col: +1 },
  { row: +1, col: +1 },
  { row: +1, col: -1 },
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: +1, col: 0 },
];
class Minesweeper {
  private _board: piece[][] = [];
  private _boardtiles: tile[][] = [];
  private _totalBombs: number = 0;
  private _row = 0;
  private _col = 0;
  private _isOver: "" | "won" | "lose" = "";
  private _isinit = false;
  private _revealCount = 0;
  private _flagCount = 0;
  private _startedTime = 0;
  constructor({
    row,
    col,
    bombs,
  }: {
    row: number;
    col: number;
    bombs: number;
  }) {
    this._totalBombs = bombs;
    this._row = row;
    this._col = col;
    this._board = init2dArray(0, { row, col });
    this._boardtiles = init2dArray("none", { row, col });
  }
  private generate({ row, col }: { row: number; col: number }) {
    this._board = this.genrateBombCount(
      this.populateBomb(this._totalBombs, { row, col }),
    );
  }
  flagLeft() {
    return this._totalBombs - this._flagCount;
  }
  isOver() {
    return this._isOver;
  }
  private updateOver() {
    if (this._isOver !== "") return;
    if (this._revealCount === this._row * this._col - this._totalBombs)
      this._isOver = "won";
  }
  private revealEmpty(position: { row: number; col: number }) {
    const vis = init2dArray(false, { row: this._row, col: this._col });
    const q = new Queue<{ row: number; col: number }>();
    q.push(position);
    while (!q.isEmpty()) {
      const curPos = q.pop();
      if (curPos) {
        if (
          !this.isValidPoition(curPos) ||
          (vis[curPos.row] as boolean[])[curPos.col]
        )
          continue;
        (vis[curPos.row] as boolean[])[curPos.col] = true;
        (this._boardtiles[curPos.row] as tile[])[curPos.col] = "revealed";
        this._revealCount++;
        if ((this._board[curPos.row] as piece[])[curPos.col] === 0) {
          surroudingPos.forEach((dif, i) => {
            q.push({ row: curPos.row + dif.row, col: curPos.col + dif.col });
          });
        }
      }
    }
  }
  reset() {
    this._board = init2dArray(0, { row: this._row, col: this._col });
    this._boardtiles = init2dArray("none", { row: this._row, col: this._col });
    this._isOver = "";
    this._isinit = false;
    this._startedTime = 0;
  }
  startTime() {
    return this._startedTime;
  }
  reveal({ row, col }: { row: number; col: number }) {
    if (this._isinit === false) {
      this.generate({ row, col });
      this._startedTime = moment().toDate().getTime();
      this._isinit = true;
    }
    if ((this._boardtiles[row] as tile[])[col] === "flag") {
      (this._boardtiles[row] as tile[])[col] = "none";
      this._flagCount--;
    } else if ((this._board[row] as piece[])[col] !== 9) {
      this.revealEmpty({ row, col });
    } else {
      this._isOver = "lose";
    }
    this.updateOver();
  }
  flag({ row, col }: { row: number; col: number }) {
    if ((this._boardtiles[row] as tile[])[col] === "flag") {
      (this._boardtiles[row] as tile[])[col] = "none";
      this._flagCount--;
    } else {
      (this._boardtiles[row] as tile[])[col] = "flag";
      this._flagCount++;
    }
  }
  board(): piece[][] {
    return this._board;
  }
  boardtile() {
    return this._boardtiles;
  }

  private populateBomb(
    totalBombs: number,
    clickLoc: { row: number; col: number },
  ): piece[][] {
    const board = init2dArray(0 as piece, { row: this._row, col: this._col });

    const row = board.length;
    const col = board[0]?.length;
    let count = 0;
    while (count < totalBombs) {
      const position = {
        row: Math.floor(Math.random() * (row - 1)),
        col: Math.floor(Math.random() * (col ? col : 0 - 1)),
      };
      if (checksurrounding({ position, clickLoc })) continue;
      const Row = board[position.row] as piece[];

      if (Row[position.col] !== 9) {
        Row[position.col] = 9;
        count++;
      }
    }
    return board;
  }

  private genrateBombCount(board: piece[][]): piece[][] {
    board.forEach((Row, row) => {
      Row.forEach((val, col) => {
        if (val !== 9) return;
        surroudingPos.forEach((dif) => {
          const newCol = col + dif.col;
          const newRow = row + dif.row;
          if (!this.isValidPoition({ row: newRow, col: newCol })) return;
          let cell = board[newRow]?.[newCol];
          if (cell !== 9 && board[newRow]?.[newCol]) board[newRow][newCol]++;
        });
      });
    });
    return board;
  }
  isValidPoition({ row, col }: { row: number; col: number }) {
    if (
      row === undefined ||
      col === undefined ||
      row < 0 ||
      row >= this._row ||
      col < 0 ||
      col >= this._col
    )
      return false;
    return true;
  }
}
export default Minesweeper;
