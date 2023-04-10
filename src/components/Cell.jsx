import React from "react";
import "./Cell.css";

const Cell = (props) => {
    const { isLit } = props;

    let classes = `cell ${isLit ? "cell-lit" : ""}`;
    return <td className={classes} />;
};

export default Cell;
