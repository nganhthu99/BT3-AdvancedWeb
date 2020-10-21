import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Game from "./Game";

//ReactDOM.render(<Game/>, document.getElementById('root'))

import {useState} from 'react';

const Index = (props) => {
    const [test, setTest] = useState(1)
    const [test2, setTest2] = useState(10)

    console.log('re-render' + test + ' ' + test2)

    const handleClick = () => {
        setTest(test + 1)
    }

    const handleClick2 = () => {
        setTest2(test2 + 1)
    }

    console.log('hello')

    return (
        <div>
            <button onClick={handleClick}>hello</button>
            <button onClick={handleClick2}>hello</button>
            <div>{test}' '{test2}</div>
        </div>
    )
};

export default Index;

ReactDOM.render(<Game/>, document.getElementById('root'))
