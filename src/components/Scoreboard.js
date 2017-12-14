import React from 'react';

const Scoreboard = (props) => (
    <div>
        <p>SCORE: {props.score}</p>
        {props.hiScore && <p>HI SCORE: {props.hiScore}</p>}
    </div>
);

export default Scoreboard;