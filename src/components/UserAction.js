import React from 'react';

const UserAction = (props) => (
    <div>
        <div className="buttonContainer">
            <button className="gameToggle" onClick={props.startGame}>PLAY</button>
        </div>
        <div className="buttonContainer">
            <p id="speedSelection">SPEED:</p>
            <button 
                name="normal" 
                className={props.speed === 100 ? 'optionToggle' : 'optionToggle selectedOption'} 
                onClick={props.selectSpeed}>
                NORMAL
            </button>
            <button 
                name="ultra" 
                className={props.speed === 300 ? 'optionToggle' : 'optionToggle selectedOption'} 
                onClick={props.selectSpeed}>
                ULTRA
            </button>
            <p id="roundSelection">ROUNDS:</p>
            <button 
                name="limitedRounds" 
                className={props.infinite ? 'optionToggle' : 'optionToggle selectedOption'} 
                onClick={props.selectRounds}>
                20
            </button>
            <button 
                name="unlimitedRounds" 
                className={!props.infinite ? 'optionToggle' : 'optionToggle selectedOption'} 
                onClick={props.selectRounds}>
                &infin;
            </button>
            <p id="retrySelection">RETRIES:</p>
            <button 
                name="strictTrue" 
                className={!props.retries ? 'optionToggle' : 'optionToggle selectedOption'} 
                onClick={props.selectStrict}>
                ON
            </button>
            <button 
                name="strictFalse" 
                className={props.retries ? 'optionToggle' : 'optionToggle selectedOption'} 
                onClick={props.selectStrict}>
                OFF
            </button>
            <p>HIGH SCORE: {props.hiScore}</p>
            <p>ULTRA HIGH SCORE: {props.ultraHiScore}</p>
        </div>
    </div>
);

export default UserAction;