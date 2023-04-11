import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board(props) {
    const { nrows, ncols, chanceLightStartsOn } = props;

    const [hasWon, setHasWon] = useState(false);
    const [board, setBoard] = useState(createBoard());

    let rowsIndex;
    let columsIndex;

    // NOTE: make board with no cells
    function createBoard() {
        const boardCanvas = [];

        [...Array(nrows).keys()].forEach(() => {
            const row = [];

            [...Array(ncols).keys()].forEach(() => {
                row.push(Math.random() < chanceLightStartsOn);
            });

            boardCanvas.push(row);
        });

        return boardCanvas;
    }

    function flipCellsAround(coordinates) {
        console.log("FLIP SETTINGS");
        let newBoard = board.map((currentRow) => [...currentRow]);
        let [y, x] = coordinates.split("-").map(Number);

        function flipCell(y, x) {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) newBoard[y][x] = !newBoard[y][x];
        }

        flipCell(y, x); // flip initial cell
        flipCell(y, x - 1); // flip left
        flipCell(y, x + 1); // flip right
        flipCell(y - 1, x); // flip below
        flipCell(y + 1, x); // flip above

        /**
         * NOTE: i are using the array .every method twice to go through the rows and columns
         * this is so that we target every cell
         * so remember the currentRow is an array also
         * that is why i am using .every on it as well
         * i will refactor this code in the next commit
         */
        const checkForWin = board.every((currentRow) => {
            return currentRow.every((currentCell) => !currentCell);
        });

        setBoard(newBoard);
        setHasWon(checkForWin);
    }

    function displayTable() {
        // IMPORTANTNOTE: insert cells in board
        const tableBoard = [];

        [...Array(nrows).keys()].forEach((_, index) => {
            const row = [];
            rowsIndex = index; //NOTE: on fait ça pour que l'index de nrows soit accessible au ncols dessous

            [...Array(ncols).keys()].forEach((_, index) => {
                columsIndex = index;
                /**
                 * IMPORTANTNOTE: index here is equals to columns index.
                 * in Colt's version they're represented as x and y and he uses regularly forloops
                 *
                 */
                let coordinates = `${rowsIndex}-${columsIndex}`;
                row.push(<Cell key={coordinates} isLit={board[rowsIndex][columsIndex]} flipNearbyCells={() => flipCellsAround(coordinates)} />);
            });

            tableBoard.push(<tr key={rowsIndex}>{row}</tr>);
        });

        return (
            <table className="board">
                <tbody>{tableBoard}</tbody>
            </table>
        );
    }

    return (
        <div>
            {hasWon ? (
                <div className="winner">
                    <span className="neon-orange">YOU</span>
                    <span className="neon-blue">WIN!</span>
                </div>
            ) : (
                <div>
                    <div className="board-title">
                        <div className="neon-orange">Lights</div>
                        <div className="neon-blue">Out</div>
                    </div>
                    {displayTable()}
                </div>
            )}
        </div>
    );
}

Board.defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25, // between 0 and 1
};

export default Board;
