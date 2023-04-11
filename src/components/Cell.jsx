import React from "react";
import "./Cell.css";

const Cell = (props) => {
    const { isLit, flipNearbyCells } = props;

    function handleClick() {
        flipNearbyCells();
    }

    let classes = `cell ${isLit ? "cell-lit" : ""}`;
    return <td className={classes} onClick={handleClick} />;
};

export default Cell;
