import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';


const Home = () => {
    return(
    <Fragment>
        <Helmet>
            <title>Quiz Game on Sports</title>
        </Helmet>
            <div id='home'>
                <section>
                    <h1>Quiz App</h1>
                    <div className='play-button-container'>                        
                        <Link className='play-button' to = '/play/instructions'>Play</Link>                        
                    </div>
                </section>
            </div>
    </Fragment>
    )
}

export default Home;