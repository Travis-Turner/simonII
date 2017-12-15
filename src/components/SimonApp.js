import React from 'react';
import Buttons from '../components/Buttons';

const SimonApp = (props) => {
    return (
        <div>
        <Buttons 
            inProgress={props.inProgress} 
            sequence={props.sequence}
            handleTouch={props.handleTouch}
            playSequence={props.playSequence}
            animationPlaying={props.animationPlaying}
            activeRed={props.activeRed}
            activeBlue={props.activeBlue}
            activeYellow={props.activeYellow}
            activeGreen={props.activeGreen}
            simulateMove={props.simulateMove}          
        />
    </div>
    )
}

export default SimonApp;