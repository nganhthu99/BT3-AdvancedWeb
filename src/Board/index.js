import React from "react";
import Square from "../Square";

export default function Board({winnerLine, squares, onClickHandle, boardSize}) {
    const renderSquare = (i) => {
        let isColored = false
        let line = winnerLine
        for (let j = 0; j < line.length; j++) {
            if (i === line[j]) {
                isColored = true
            }
        }
        return <Square value={squares[i]}
                       onClickHandle={() => onClickHandle(i)}
                       winnerLine={winnerLine}
                       isColored={isColored}/>;
    }

    const createSquares = (n) => {
        let row = []
        for (let i = 0; i < n; i++) {
            let column = []
            for (let j = 0; j < n; j++) {
                column.push(renderSquare(n * i + j))
            }
            row.push(<div className="board-row">{column}</div>)
        }
        return row
    }

    return (
        <div>
            <div>{createSquares(boardSize)}</div>
        </div>
    )
}
