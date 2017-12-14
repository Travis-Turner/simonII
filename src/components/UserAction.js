import React from 'react';

const UserAction = (props) => (
    <div>
        <button id="gameToggle" onClick={props.startGame}>{props.inProgress ? 'RESET' : 'START'}</button>
    </div>
);

export default UserAction;