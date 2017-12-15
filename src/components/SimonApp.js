import React from 'react';
import Buttons from '../components/Buttons';

class SimonApp extends React.Component {
    constructor (props){
        super(props);
    }
    componentDidMount () {
        this.props.generateSequenceAndAnimate();
    }
    render () {
        return (
            <div>
            <Buttons 
                inProgress={this.props.inProgress} 
                sequence={this.props.sequence}
                handleTouch={this.props.handleTouch}
                playSequence={this.props.playSequence}
                animationPlaying={this.props.animationPlaying}
                activeRed={this.props.activeRed}
                activeBlue={this.props.activeBlue}
                activeYellow={this.props.activeYellow}
                activeGreen={this.props.activeGreen}
                simulateMove={this.props.simulateMove}          
            />
        </div>
        )
    }
}

export default SimonApp;