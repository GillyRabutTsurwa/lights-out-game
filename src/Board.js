import { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

const Board = (props) => {
  const { nrows, ncols, chanceLightStartsOn } = props;

  const [hasWon, setHasWon] = useState(false);
  const [board, setBoard] = useState([]);
  const [tableBoard, setTableBoard] = useState([]);

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

    /**
     * IMPORTANTNOTE:
     * je combine les code dans le deux fonction dans une fonction pour que sa marche
     * apres avoir trouvé une solution, je vais diviser le code à nouveau
     * code dessous ce commentaire est celui qui devrait être dans une autre fonction. allez
     */

    const tableBoard = [];

    //TESTING
    const nrowsIndexing = [...Array(nrows).keys()];
    const ncolsIndexing = [...Array(ncols).keys()];

    [...Array(nrows).keys()].forEach((_, index) => {
      const row = [];
      let rowsIndex = index; //NOTE: on fait ça pour que l'index de nrows soit accessible au ncols dessous

      [...Array(ncols).keys()].forEach((_, index) => {
        console.log(board);
        row.push(<Cell isLit={board[rowsIndex][index]} key={`${rowsIndex}-${index}`} />);
      });

      tableBoard.push(<tr key={rowsIndex}>{row}</tr>);
    });

    setTableBoard(tableBoard); /* pour ne pas être confu avec notre variable d'état, aussi nommé tableBoard */
  };

  const displayBoard = () => {
    /**
     * ...une fois que je saurai faire le state accessible parmi les fonctions
     * ... je vais diviser le code dans deux fonction en mettant le code appropié ici
     * mais pour le moment...
     * ...le code se trouve dans une (grande) fonction. regardez là-dessûs
     */
  };

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <table className="board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
};

Board.defaultProps = {
  nrows: 5,
  ncols: 5,
  chanceLightStartsOn: 0.25, // between 0 and 1
};

export default Board;
