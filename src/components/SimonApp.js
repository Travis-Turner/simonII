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
            <div id="bgFx" className={this.props.face === '^O^' && 'bgFx-active'}>
            <Buttons 
                inProgress={this.props.inProgress} 
                sequence={this.props.sequence}
                handleTouch={this.props.handleTouch}
                animationPlaying={this.props.animationPlaying}
                activeRed={this.props.activeRed}
                activeBlue={this.props.activeBlue}
                activeYellow={this.props.activeYellow}
                activeGreen={this.props.activeGreen}
                score={this.props.score}
                face={this.props.face}
            />
            
        </div>
        )
    }
}

export default SimonApp;