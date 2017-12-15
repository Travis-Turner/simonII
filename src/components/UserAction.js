import React from 'react';

const UserAction = (props) => (
    <div>
        <div className="buttonContainer">
            <button className="gameToggle" onClick={props.startGame}>PLAY</button>
        </div>
        <div className="buttonContainer">
            <p id="speedSelection">SPEED:</p>
            <button name="normal" className="gameToggle" onClick={props.selectSpeed}>NORMAL</button>
            <button name="ultra" className="gameToggle" onClick={props.selectSpeed}>ULTRA</button>
            <p>HIGH SCORE: {props.hiScore}</p>
            <p>ULTRA HIGH SCORE: {props.ultraHiScore}</p>
        </div>
    </div>
);

export default UserAction;