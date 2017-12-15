import React from 'react';

const Header = (props) => (
    <div>
        {props.inProgress ? 
            <div>
                <h3>SIMON II</h3>
                <button onClick={props.resetGame} id="menuButton">QUIT</button> 
            </div>  :
            <h1>SIMON II</h1>
        }     
    </div>
);

export default Header;