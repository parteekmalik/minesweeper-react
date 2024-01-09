import Queue from "../helper/queue";

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
  private _isOver = false;
  private _isinit = false;
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
        if ((this._board[curPos.row] as piece[])[curPos.col] === 0) {
          surroudingPos.forEach((dif, i) => {
            q.push({ row: curPos.row + dif.row, col: curPos.col + dif.col });
          });
        }
      }
    }
  }
  reveal({ row, col }: { row: number; col: number }) {
    if (this._isinit === false) {
      this.generate({ row, col });
      this._isinit = true;
    }
    if ((this._boardtiles[row] as tile[])[col] === "flag") {
      (this._boardtiles[row] as tile[])[col] = "none";
    } else if ((this._board[row] as piece[])[col] !== 9) {
      this.revealEmpty({ row, col });
    } else {
      this._isOver = true;
    }
  }
  flag({ row, col }: { row: number; col: number }) {
    if ((this._boardtiles[row] as tile[])[col] === "flag") {
      (this._boardtiles[row] as tile[])[col] = "none";
    } else (this._boardtiles[row] as tile[])[col] = "flag";
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
      const Row = board[position.row] as piece[];
      if (
        Row[position.col] !== 9 &&
        clickLoc.row !== position.row &&
        clickLoc.col !== position.col
      ) {
        Row[position.col] = 9;
        count++;
      }
      // console.log(count);
    }
    return board;
  }

  private genrateBombCount(board: piece[][]): piece[][] {
    board.forEach((Row, row) => {
      Row.forEach((val, col) => {
        console.log("row-col ->", row + "," + col);
        if (val !== 9) return;
        surroudingPos.forEach((dif) => {
          const newCol = col + dif.col;
          const newRow = row + dif.row;
          if (!this.isValidPoition({ row: newRow, col: newCol })) return;
          // console.log(newRow, newCol);
          const Row = board[newRow] as piece[];
          if (Row[newCol] !== 9) Row[newCol]++;
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
