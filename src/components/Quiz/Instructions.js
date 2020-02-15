import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
// import answer from '../../assets/images/answer.png';
// import fiftyFifty from '../../assets/images/fiftyFifty.PNG';
// import hints from '../../assets/images/hints.PNG';
// import options from '../../assets/images/options.PNG';

const Instructions = () => (
    <Fragment>
        <Helmet>
            <title>Quiz Instructions</title>
        </Helmet>
        <div className = 'instructions-container'>
            <h1>How to Play</h1>
            <p>Read the instructions carefully, it contains all the rules and regulations</p>
            <ul className = 'browser-default' id='main-list'>
                <li>This Game has a duration of 15 mins and completes as soon as the time elapses</li>
                <li>The game consists of 20 questions</li>
                <li>
                    Each questions has 4 options
                    {/* <img src = {options} alt = 'options'/> */}
                </li>
                <li>
                    Select the most suitable answer
                    {/* <img src = {answer} alt = 'answer'/> */}
                </li>
                <li>
                    Each game has 2 lifelines namely:
                    <ul>
                        <li>
                            50-50 chances (It will remove 2 wrong answers)
                            {/* <img src = {fiftyFifty} alt = '50-50 example'/> */}
                        </li>
                        <li>
                            Hints(It will remove a wrong option)
                            {/* <img src = {hints} alt = 'hints example'/> */}
                        </li>
                    </ul>
                </li>
                <li>Feel free to quit anytime, results will be displayed after you quit</li>
                <li>The timer starts as soon as the game loads</li>
                <li>Let's get started...</li>
            </ul>
            <div>
                <span className = 'left'><Link to = '/'>Give up!</Link></span>
                <span className = 'right'><Link to = '/play'>Start Quiz!</Link></span>
            </div>
        </div>
    </Fragment>
)

export default Instructions