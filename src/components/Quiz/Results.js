import React,{Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers:0,
            wrongAnswers:0,
            score: 0
        }
    }
    componentDidMount(){
        const {state} = this.props.location;
        this.setState({
            score: (state.score / 20) * 100,
            numberOfQuestions: 20,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers:state.correctAnswers,
            wrongAnswers: state.wrongAnswers

        })
    }
    handleHome = () => {
        this.props.history.push('/');
    }
    handleGame = () => {
        this.props.history.push('/play');
    }
    render(){
        console.log(this.props)
        console.log(this.state)
        const {score} = this.props.history.location.state;
        const {state} = this.props.history.location;
        let stats,remark;
        if(this.state.score<=20){
            remark = 'Bad';
        }else if(this.state.score>20 && this.state.score<=40){
            remark = 'Not Good Enough';
        }else if(this.state.score>40 && this.state.score<=60){
            remark = 'Average';
        }else if(this.state.score>60 && this.state.score<=80){
            remark = 'Good';
        }else if(this.state.score>80 && this.state.score<100){
            remark = 'Awesome';
        }else{
            remark = 'Perfect';
        }
       
        if(state.numberOfAnsweredQuestions > 0){
            console.log(state.numberOfAnsweredQuestions)
            stats = (
                <Fragment>
                    <div>
                        <h3>You have completed the quiz</h3>
                    </div>
                    <div className = 'container'>
                        <h4>{remark}</h4>
                        <h5>Your Score: {this.state.score.toFixed(0)}%</h5>
                        <p className = 'left'>Total Questions</p><p className = 'right'>{this.state.numberOfQuestions}</p><br />
                        <p className = 'left'>Total Questions Answered</p><p className = 'right'>{this.state.numberOfAnsweredQuestions}</p><br />
                        <p className = 'left'>Correct Answers</p><p className = 'right'>{this.state.correctAnswers}</p><br />
                        <p className = 'left'>Incorrect Answered</p><p className = 'right'>{this.state.wrongAnswers}</p><br />
                    </div>
                    <section>
                        <ul>
                            <li>
                                {/* <Link to = '/' className = 'left'>Back to Home</Link>
                                <Link to = '/play' className = 'right'>Play Again</Link> */}
                                <button className='left' onClick={this.handleHome}>Back To Home</button>
                                <button className='right' onClick={this.handleGame}>Play Again</button>
                            </li>
                        </ul>
                    </section>
                </Fragment>
            )
        }else{
            stats = (
                <div>
                <h3 className = 'no-stats'>No stats available</h3>
                <section>
                        <ul>
                            <li>
                                {/* <Link to = '/' className = 'left'>Back to Home</Link>
                                <Link to = '/play' className = 'right'>Play Again</Link> */}
                                <button className='left' onClick={this.handleHome}>Back To Home</button>
                                <button className='right' onClick={this.handleGame}>Play Again</button>
                            </li>
                        </ul>
                    </section>
                    </div>
            )
        }return(
            <Fragment>
                <Helmet><title>Results</title></Helmet>
                {stats}
            </Fragment>
        )
    }
}
export default Results