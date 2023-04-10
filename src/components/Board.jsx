import { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board(props) {
    const { nrows, ncols, chanceLightStartsOn } = props;

    const [hasWon, setHasWon] = useState(false);
    const [board, setBoard] = useState([]);
    const [tableBoard, setTableBoard] = useState([]);

    // NOTE: make board with no cells
    const createBoard = () => {
        const board = [];

        [...Array(nrows).keys()].forEach((_, index) => {
            const row = [];

            [...Array(ncols).keys()].forEach((_, index) => {
                row.push(Math.random() < chanceLightStartsOn);
            });

            board.push(row);
        });

        setBoard(board);

        // IMPORTANTNOTE: insert cells in board
        const tableBoard = [];
        [...Array(nrows).keys()].forEach((_, index) => {
            const row = [];
            let rowsIndex = index; //NOTE: on fait ça pour que l'index de nrows soit accessible au ncols dessous

            [...Array(ncols).keys()].forEach((_, index) => {
                /**
                 * IMPORTANTNOTE: index here is equals to columns index.
                 * in Colt's versino they're represented as x and y and he uses regularly forloops
                 */
                console.log(board);
                row.push(<Cell isLit={board[rowsIndex][index]} key={`${rowsIndex}-${index}`} />);
            });

            tableBoard.push(<tr key={rowsIndex}>{row}</tr>);
        });

        setTableBoard(tableBoard); /* pour ne pas être confu avec notre variable d'état, aussi nommé tableBoard */
    };

    useEffect(() => {
        createBoard();
    }, []);

    return (
        <table className="board">
            <tbody>{tableBoard}</tbody>
        </table>
    );
}

Board.defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25, // between 0 and 1
};

export default Board;
