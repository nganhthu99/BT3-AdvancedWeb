import React from "react";

export default function Square({value, onClickHandle, isColored}) {
    return (
        <button className="square" onClick={onClickHandle} style={isColored ? {backgroundColor: "yellow"}: {}}>
            {value}
        </button>
    )
}
