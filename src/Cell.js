import React from "react";
import "./Cell.css";

const Cell = (props) => {
  const { isLit } = props;

  const handleClick = (evt) => {
    props.flipCellsAroundMe();
  };

  let classes = `cell ${isLit ? "cell-lit" : ""}`;
  return (
    <td
      className={classes}
      onClick={() => {
        handleClick;
      }}
    />
  );
};

export default Cell;
