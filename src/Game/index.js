import React, {useState} from "react";
import Board from "../Board";
import {calculateWinner, checkBoardFull} from "./game_service";


export default function Game() {
    const [boardSize, setBoardSize] = useState(3)
    const [history, setHistory] = useState([
        {
            squares: Array(boardSize * boardSize).fill(null),
            step: Array(2).fill(null)
        }
    ])
    const [isXTurn, setIsXTurn] = useState(true)
    const [stepNumber, setStepNumber] = useState(0)
    const [isDescending, setIsDescending] = useState(false)

    const handleClick = (i) => {
        let copyHistory = history.slice(0, stepNumber + 1)
        let current = copyHistory[copyHistory.length - 1]
        let squares = current.squares.slice()
        let step = current.step.slice()
        if (squares[i] || calculateWinner(squares, step, boardSize, (isXTurn ? 'O' : 'X')))
            return
        squares[i] = isXTurn ? 'X' : 'O'

        setHistory(copyHistory.concat({
            squares: squares,
            step: [Math.floor(i / boardSize), i % boardSize]
        }),)

        setIsXTurn(!isXTurn)
        setStepNumber(copyHistory.length)
    }
    const jumpTo = (index) => {
        setIsXTurn(index % 2 === 0)
        setStepNumber(index)
    }
    const handleSortClick = () => {
        setIsDescending(!isDescending)
    }
    const handleBoardSizeInput = (e) => {
        if (e.keyCode === 13) {
            let input = Number(e.target.value)
            setBoardSize(input)
            setHistory([
                {
                    squares: Array(input ** 2).fill(null),
                    step: Array(2).fill(null)
                }
            ])
            setIsXTurn(true)
            setStepNumber(0)
            setIsDescending(false)
        }
    }

    console.log(boardSize)
    console.log(history)

    let copyHistory = history.slice()
    let current = copyHistory[stepNumber]
    let squares = current.squares.slice()
    let step = current.step.slice() //check
    let status
    let line = []
    let result = calculateWinner(squares, step, boardSize, (isXTurn ? 'O' : 'X'))
    if (result) {
        status = 'Winner: ' + result.winner
        line = result.line
    } else if (checkBoardFull(squares)) {
        status = 'Result is a draw!'
    } else {
        status = 'Next player: ' + ((isXTurn) ? 'X' : 'O');
    }
    let historyMoves = copyHistory.map((move, index) => {
        let buttonString = (index) ? ('Go to move #' + index + ' (row: ' + move.step[0] + ', column: ' + move.step[1] + ')') : 'Go to game start'
        return (
            <li key={index}>
                <button onClick={() => jumpTo(index)} style={(stepNumber === index) ? {fontWeight: "bold"} : {}}>
                    {buttonString}
                </button>
            </li>
        )
    })
    if (isDescending)
        historyMoves.reverse()
    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares}
                       onClickHandle={(i) => handleClick(i)}
                       winnerLine={line}
                       boardSize={boardSize}/>
            </div>
            <div className="game-info">
                <div className='board-size'>
                    <div>Board size:</div>
                    <input defaultValue="3" onKeyUp={(e) => handleBoardSizeInput(e)}/>
                </div>
                <div className="status">{status}</div>
                <button onClick={() => handleSortClick()} style={(isDescending) ? {fontWeight: "bold"} : {}}>Sort
                    moves descending
                </button>
                <ol>{historyMoves}</ol>
            </div>
        </div>
    )
}
