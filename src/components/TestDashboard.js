import React from 'react';
import Header from '../components/Header';
import UserAction from '../components/UserAction';
import Scoreboard from '../components/Scoreboard';
import Buttons from '../components/Buttons';
import { Howl } from 'howler';
import ReactHowler from 'react-howler';
import SimonApp from '../components/SimonApp';
import {redTone, blueTone, greenTone, yellowTone, bgTrack, bgUltraTrack, loseSfx, launchSfx} from '../sounds/sounds';
import { setTimeout } from 'core-js/library/web/timers';

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
        speed: 300,
        difficulty: 500,
        strict: true
    }   
    componentDidMount () {
        // launchSfx.play();
    }
    generateSequenceAndAnimate = () => {
        const randNum = Math.floor(Math.random() * 4);   
        this.setState((prevState) => ({
            sequence: [...prevState.sequence, randNum],
            localSequence: [],
            move: prevState.move + 1,
            score: this.state.move >= 1 ? prevState.score + 1: 0
        }), () => {
            this.beginAnimation();
        }); 
    }
    failAttemptAnimation = () => {
        this.setState(() => ({
            localSequence: []
        }), () => {
            this.beginAnimation();
        })
    }
    pushToLocal = (input) => {
        const selection = Number(input);
        this.setState((prevState) => ({
            localSequence: [...prevState.localSequence, selection],
            move: prevState.move + 1
        }), () => {
            this.compareSequences();
        });
    }
    compareSequences = () => {
        const local = this.state.localSequence;
        const master = this.state.sequence;
        const move = this.state.move;
        const masterCompare = this.state.sequence.slice(0, move);
            if (local.toString() === masterCompare.toString()){
                if (local.length === master.length){
                    this.setState(() => ({
                        move: 0,
                        animationPlaying: true
                    }), () => {
                        setTimeout(() => {
                            this.generateSequenceAndAnimate();
                        },500)
                        
                    })        
                }
            } else if (this.state.strict) {
                this.setState(() => ({
                    move: 0
                }), () => {
                    loseSfx.play();
                    this.setState(() => ({
                        animationPlaying: true
                    }), () => {
                        setTimeout(() => {
                            this.failAttemptAnimation();
                        }, 1000)     
                    })                    
                })               
            } else {
                this.gameOver();
            }        
    }
    selectSpeed = (e) => {
        if (e.target.name === 'normal'){
            this.setState(() => ({
                difficulty: 500,
                speed: 300
            }))
        } else {
            this.setState(() => ({
                difficulty: 250,
                speed: 100
            }))
        }
    }
    startGame = () => {
        setTimeout(() => {
            // this.state.difficulty === 500 ? bgTrack.play() : bgUltraTrack.play();              
            this.setState(() => ({
                inProgress: true
            }));
        },400); 
    }; 
    //Animation functions
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
                    position: 0
                }), () => {
                        clearInterval(interval);
                            this.setState(() => ({
                                animationPlaying: false,
                                localSequence: [],
                                move: 0
                            }));                   
                    });
        }
    }
    gameOver = () => {
        loseSfx.play();
        setTimeout(() => {
            bgTrack.stop();
            bgUltraTrack.stop();
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
        this.pushToLocal(e.target.name);
        

    } 
    render () {
        return (
            <div>               
                <Header />
                {!this.state.inProgress &&
                    <UserAction  
                        startGame={this.startGame} 
                        startGameUltra={this.startGameUltra}
                        inProgress={this.state.inProgress}
                        hiScore={this.state.hiScore}
                        ultraHiScore={this.state.ultraHiScore}
                        selectSpeed={this.selectSpeed}
                    />
                }                      
                {this.state.inProgress && 
                    <div>
                        <Scoreboard score={this.state.score} hiScore={this.state.hiScore} inProgress={this.state.inProgress}/>                    
                        <SimonApp 
                            inProgress={this.state.inProgress}          
                            sequence={this.state.sequence}
                            handleTouch={this.handleTouch}
                            playSequence={this.playSequence}
                            animationPlaying={this.state.animationPlaying}
                            activeRed={this.state.activeRed}
                            activeBlue={this.state.activeBlue}
                            activeYellow={this.state.activeYellow}
                            activeGreen={this.state.activeGreen}
                            beginAnimation={this.beginAnimation}
                            generateSequenceAndAnimate={this.generateSequenceAndAnimate}
                        />
                    </div>
                }               
            </div>
        )
    }
}
export default Dashboard;