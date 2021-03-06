import React from 'react';
import ReactDOM from 'react-dom';
import ReactHowler from 'react-howler';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Buttons extends React.Component {
    constructor (props){
        super(props);
    }
    render () {
        return (                     
            <div id="buttonContainer">   
               
                    <div id="scoreDisplay">                     
                            {!this.props.animationPlaying ? <span className="counter">{this.props.score}</span> : <span className="counter">
                                <span className={this.props.face === '^O^' && 'counterActive'}>{this.props.face}</span></span>}                                              
                    </div>       
                                  
                    <button disabled={!this.props.inProgress || this.props.animationPlaying} 
                        id="redButton" 
                        onClick={this.props.handleTouch}
                        className={this.props.activeRed ? 'actionButtons animatedRedButton' : 'actionButtons'}
                        name='0'>
                    </button>
                    <button disabled={!this.props.inProgress || this.props.animationPlaying} 
                        id="blueButton" 
                        onClick={this.props.handleTouch}
                        className={this.props.activeBlue ? 'actionButtons animatedBlueButton' : 'actionButtons'}
                        name='1'>
                    </button>
                    <button disabled={!this.props.inProgress || this.props.animationPlaying} 
                        id="yellowButton"
                        onClick={this.props.handleTouch}
                        className={this.props.activeYellow ? 'actionButtons animatedYellowButton' : 'actionButtons'}
                        name='2'>
                    </button>
                    <button disabled={!this.props.inProgress || this.props.animationPlaying} 
                        id="greenButton" 
                        onClick={this.props.handleTouch}
                        className={this.props.activeGreen ? 'actionButtons animatedGreenButton' : 'actionButtons'}
                        name='3'>
                    </button>
               
            </div>           
        )
    }
}

export default Buttons;