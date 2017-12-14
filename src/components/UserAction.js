import React from 'react';

const UserAction = (props) => (
    <div id="gameToggleContainer">
        <button className="gameToggle" onClick={props.startGame}>NORMAL</button>
        <button className="gameToggle" onClick={props.startGameHard}>ULTRA</button>
        <p>HIGH SCORE: {props.hiScore}</p>
        <p>ULTRA HIGH SCORE: {props.ultraHiScore}</p>
    </div>
);

export default UserAction;