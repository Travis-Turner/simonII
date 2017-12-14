import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Header from './components/Header';
import UserAction from './components/UserAction';
import Scoreboard from './components/Scoreboard';
import Buttons from './components/Buttons';

class SimonApp extends React.Component {
    state = {
        inProgress: false,
        sequence: [],
        localSequence: [],
        move: 0,
        score: 0,
        hiScore: 0,
        animationPlaying: false,
        position: 0, 
        activeRed: false,
        activeBlue: false,
        activeYellow: false,
        activeGreen: false, 
        sessionPlays: 0
    }
    generateSequence = () => {
        const randNum = Math.floor(Math.random() * 4);   
        this.setState((prevState) => ({
            sequence: [...prevState.sequence, randNum],
            localSequence: [],
            score: prevState.move !== 0 ? prevState.score + 1 : prevState.score
        })); 
    }
    componentDidUpdate () {
        this.checkSequences();
        if (this.checkLength()){
            return this.generateSequence();
        }
    }
    startGame = () => {
        setTimeout(() => {
            if (this.state.sessionPlays === 0){
                this.setState((prevState) => ({
                    sessionPlays: prevState.sessionPlays + 1
                }))
            }
            if (this.state.inProgress){
                return this.gameOver();
            }
            if (this.state.sequence.length === 0 && this.state.inProgress){
                this.generateSequence();
                this.beginAnimation();
            }     
            
            return this.setState((prevState) => {
                return {
                    inProgress: !prevState.inProgress
                }
            })
        },400); 
    }; 
    beginAnimation = () => {
        const animationInterval = setInterval(() => {
            this.toggleColor(this.state.sequence[this.state.position], animationInterval);
        }, 1000);
    }
    toggleColor = (color, interval) => {
        switch (color) {
            case 0:
                return this.setState((prevState) => ({activeRed: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {
                    return this.setState((prevState) => ({activeRed: false}));
                }, 700)});
            case 1:
                return this.setState((prevState) => ({activeBlue: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {
                    return this.setState((prevState) => ({activeBlue: false}));
                }, 700)});
            case 2:
                return this.setState((prevState) => ({activeYellow: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {
                    return this.setState((prevState) => ({activeYellow: false}));
                }, 700)});
            case 3:
                return this.setState((prevState) => ({activeGreen: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {
                    return this.setState((prevState) => ({activeGreen: false}));
                }, 700)});
            default: 
                return this.setState(() => ({
                    position: 0,
                    animationPlaying: false
                }), clearInterval(interval));
        }
    }
    gameOver = () => {
        clearInterval();
        this.setState((prevState) => ({
            inProgress: false,
            sequence: [],
            localSequence: [],
            score: 0,
            move: 0,
            hiScore: prevState.hiScore > prevState.score ? prevState.hiScore : prevState.score,
            gameOver: true
        }))
    }
    
    pushToLocal = (selection) => {
       this.setState((prevState) => ({
           localSequence: [...prevState.localSequence, selection]
       }))
    }
    checkLength = () => {
        if (this.state.sequence.length === this.state.localSequence.length && this.state.inProgress){
            this.beginAnimation();
            return true;
        }
    }
    checkSequences = () => {
        const lengthToCheck = this.state.localSequence.length;
        for (let i = 0; i < lengthToCheck; i++){
            if (this.state.localSequence[i] !== this.state.sequence[i]){
                return this.gameOver();
            }
        }
    }
    handleTouch = (e) => {
        this.checkSequences();
        const selection = Number(e.target.name);  
        this.pushToLocal(selection);
        
    } 
    render () {
        return (
            <div>
                <Header />
                <div id="topPanel">
                    <UserAction  startGame={this.startGame} inProgress={this.state.inProgress}/>
                    <Scoreboard score={this.state.score} hiScore={this.state.hiScore}/>
                </div>
                <div
                    className={!this.state.inProgress && this.state.sessionPlays > 0 && 'gameOver'}
                    >
                    <Buttons 
                        inProgress={this.state.inProgress} 
                        sequence={this.state.sequence}
                        handleTouch={this.handleTouch}
                        playSequence={this.playSequence}
                        animationPlaying={this.state.animationPlaying}
                        activeRed={this.state.activeRed}
                        activeBlue={this.state.activeBlue}
                        activeYellow={this.state.activeYellow}
                        activeGreen={this.state.activeGreen}
                        simulateMove={this.simulateMove}
                        sessionPlays={this.state.sessionPlays}
                    />
                </div>
                
            </div>
        )
    }
}
ReactDOM.render(<SimonApp />, document.getElementById('app'));
