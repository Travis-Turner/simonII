import React from 'react';

const Scoreboard = (props) => (
    <div id="scoreBoardContainer">
        <p>SCORE: {props.score}</p>
        {props.hiScore && !props.inProgress && <p>HI SCORE: {props.hiScore}</p>}
    </div>
);

export default Scoreboard;