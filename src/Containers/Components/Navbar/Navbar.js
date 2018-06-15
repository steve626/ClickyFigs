import React from "react";
import './Navbar.css';

const Navbar = props =>(
    <nav>
        
            {/* <li className='brand animated lightSpeedIn' id="clicky"> */}
                <p id="p">{props.title}</p>
            {/* </li> */}
        <ul>
            <li id='curScore'>Current Score: {props.score}</li>

            <li id='topScore'>Top Score: {props.topScore}</li>
            
            <li id='rw'>{props.rightWrong}</li>
        </ul>
    </nav>
);

export default Navbar;