import React from 'react';
import Header from '../components/Header';
import UserAction from '../components/UserAction';
import Scoreboard from '../components/Scoreboard';
import Buttons from '../components/Buttons';
import { Howl } from 'howler';
import ReactHowler from 'react-howler';
import SimonApp from '../components/SimonApp';

const redTone = new Howl({
    src: '/sounds/redtone.mp3'
});
const blueTone = new Howl({
    src: '/sounds/bluetone.mp3'
});
const greenTone = new Howl({
    src: '/sounds/greentone.mp3'
});
const yellowTone = new Howl({
    src: '/sounds/yellowtone.mp3'
});

const bgTrack = new Howl({
    src: '/sounds/bg-track.mp3',
    loop: true
});


class Dashboard extends React.Component {
    state = {
        inProgress: false,
        sequence: [],
        localSequence: [],
        move: 0,
        score: 0,
        hiScore: 0,
        ultraHiScore: 0,
        animationPlaying: false,
        position: 0, 
        activeRed: false,
        activeBlue: false,
        activeYellow: false,
        activeGreen: false, 
        sessionPlays: 0,
        speed: 300,
        difficulty: 500
    }
    
    generateSequence = () => {
        const randNum = Math.floor(Math.random() * 4);   
        this.setState((prevState) => ({
            sequence: [...prevState.sequence, randNum],
            localSequence: [],
            move: prevState.move + 1,
            score: this.state.move >= 1 ? prevState.score + 1: 0
        })); 
    }
    componentDidUpdate () {
        this.checkSequences();
        if (this.checkLength()){
            return this.generateSequence();
        }
    }
    startGame = () => {
        this.setState(() => ({
            difficulty: 500,
            speed: 300
        }))
        setTimeout(() => {
            bgTrack.play();
            if (this.state.sessionPlays === 0){
                
                this.setState((prevState) => ({
                    sessionPlays: prevState.sessionPlays + 1
                }))
            }
            if (this.state.inProgress){
                bgTrack.stop();
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
    startGameHard = () => {
        this.setState(() => ({
            difficulty: 250,
            speed: 100
        }))
        setTimeout(() => {
            bgTrack.play();
            if (this.state.sessionPlays === 0){
                
                this.setState((prevState) => ({
                    sessionPlays: prevState.sessionPlays + 1
                }))
            }
            if (this.state.inProgress){
                bgTrack.stop();
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
    }
    beginAnimation = () => {
        const animationInterval = setInterval(() => {
            this.toggleColor(this.state.sequence[this.state.position], animationInterval);
        }, this.state.difficulty);
    }
    toggleColor = (color, interval) => {
        const speed = this.state.speed;
        switch (color) {
            case 0:
                redTone.play();
                return this.setState((prevState) => ({activeRed: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {                    
                    return this.setState((prevState) => ({activeRed: false}));
                }, speed)});
            case 1:
                blueTone.play();
                return this.setState((prevState) => ({activeBlue: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {                    
                    return this.setState((prevState) => ({activeBlue: false}));
                }, speed)});
            case 2:
                yellowTone.play();
                return this.setState((prevState) => ({activeYellow: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {                   
                    return this.setState((prevState) => ({activeYellow: false}));
                }, speed)});
            case 3:
                greenTone.play();
                return this.setState((prevState) => ({activeGreen: true, animationPlaying: true, position: prevState.position + 1}), () => {setTimeout(() => {                   
                    return this.setState((prevState) => ({activeGreen: false}));
                }, speed)});
            default: 
                return this.setState(() => ({
                    position: 0,
                    animationPlaying: false
                }), clearInterval(interval));
        }
    }
    gameOver = () => {
        setTimeout(() => {
            bgTrack.stop();
            if (this.state.difficulty === 250){
                this.setState((prevState) => ({
                    ultraHiScore: prevState.ultraHiScore > prevState.score ? prevState.ultraHiScore : prevState.score
                }))
            } else {
                this.setState((prevState) => ({
                    hiScore: prevState.hiScore > prevState.score ? prevState.hiScore : prevState.score
                }))
            }
            this.setState((prevState) => ({
                inProgress: false,
                sequence: [],
                localSequence: [],
                score: 0,
                move: 0,
                gameOver: true
            }))
        },400)
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
        switch(e.target.name){
            case '0':
                redTone.play();
                break;
            case '1':
                blueTone.play();
                break;
            case '2':
                yellowTone.play();
                break;
            case '3':
                greenTone.play();
                break;
        }
        this.checkSequences();
        const selection = Number(e.target.name);  
        this.pushToLocal(selection);
        
    } 
    render () {
        return (
            <div>
                <ReactHowler
                    src='./sounds/simon2.mp3'
                    playing={this.state.sessionPlays === 0}
                    preload={true}
                />
                <Header />
                
                {!this.state.inProgress &&
                    <UserAction  
                        startGame={this.startGame} 
                        startGameHard={this.startGameHard}
                        inProgress={this.state.inProgress}
                        hiScore={this.state.hiScore}
                        ultraHiScore={this.state.ultraHiScore}
                    />
                }
                      
                {this.state.inProgress && 
                    <div>
                        <Scoreboard score={this.state.score} hiScore={this.state.hiScore} inProgress={this.state.inProgress}/>                    
                        <SimonApp 
                            inProgress={this.state.inProgress}
                            sessionPlays={this.state.sessionPlays}
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
                }               
            </div>
        )
    }
}
export default Dashboard;