import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

class SimonApp extends React.Component {
    state = {
        inProgress: false,
        sequence: [],
        localSequence: [],
        move: 0,
        score: 0,
        hiScore: 0,
        activeRed: false
    }
    generateSequence = () => {
        const randNum = Math.floor(Math.random() * 4);
        this.setState((prevState) => ({
            sequence: [...prevState.sequence, randNum],
            score: prevState.move !== 0 ? prevState.score + 1 : prevState.score
        })); 
    }
    componentDidMount () {
        this.generateSequence();
    }
    startGame = () => {
        return this.setState((prevState) => {
            return {
                inProgress: !prevState.inProgress
            }
        })
    }; 
    gameOver = () => {
        this.setState((prevState) => ({
            inProgress: false,
            sequence: [],
            localSequence: [],
            score: 0,
            move: 0,
            hiScore: prevState.hiScore > prevState.score ? prevState.hiScore : prevState.score
        }))
    }
    checkMatch = (lengthToCheck) => {
        for (let i = 0; i < lengthToCheck; i++){
            if (this.state.localSequence[i] !== this.state.sequence[i]){
                this.gameOver();
            } 
        }
        this.generateSequence();
    }
    handleTouch = (e) => {
        this.setState((prevState) => ({
            localSequence: [...prevState.localSequence, selection],
            move: prevState.move + 1
        }), () => {
            this.checkMatch(this.state.move);
        });
        const selection = Number(e.target.name);
        const inputLength = this.state.sequence.length;
        
    }
    render () {
        return (
            <div>
                <Header />
                <div id="topPanel">
                    <UserAction  startGame={this.startGame} inProgress={this.state.inProgress}/>
                    <Scoreboard score={this.state.score} hiScore={this.state.hiScore}/>
                </div>
                <Buttons 
                    inProgress={this.state.inProgress} 
                    sequence={this.state.sequence}
                    handleTouch={this.handleTouch}
                    playSequence={this.playSequence}
                />
            </div>
        )
    }
}

const Header = () => (
    <div>
        <h1>SIMON II</h1>
    </div>
);

const UserAction = (props) => (
    <div>
        <button id="gameToggle" onClick={props.startGame}>{props.inProgress ? 'RESET' : 'START'}</button>
    </div>
);

const Scoreboard = (props) => (
    <div>
        <p>SCORE: {props.score}</p>
        {props.hiScore && <p>HI SCORE: {props.hiScore}</p>}
    </div>
);

class RedButton extends React.Component {
    constructor (props){
        super(props);
    }
    render () {
        return (            
                <button disabled={!this.props.inProgress} id="redButton"
                    onClick={this.props.handleTouch}
                    className={'actionButtons'} 
                    name='0'>
                </button>                
        )
    } 
}



class Buttons extends React.Component {
    constructor (props){
        super(props);
    }
    render () {
        return (                     
                    <div id="buttonContainer"> 
                        <RedButton 
                            inProgress={this.props.inProgress}
                            handleTouch={this.props.handleTouch}
                            playSequence={this.props.playSequence}
                        />               
                        <button disabled={!this.props.inProgress} id="blueButton" 
                            onClick={this.props.handleTouch}
                            className={'actionButtons'}
                            name='1'>
                        </button>
                        <button disabled={!this.props.inProgress} id="yellowButton"
                            onClick={this.props.handleTouch}
                            className="actionButtons" 
                            name='2'>
                        </button>
                        <button disabled={!this.props.inProgress} id="greenButton" 
                            onClick={this.props.handleTouch}
                            className="actionButtons" 
                            name='3'>
                        </button>
                    </div>           
        )
    }
}
 
ReactDOM.render(<SimonApp />, document.getElementById('app'));
