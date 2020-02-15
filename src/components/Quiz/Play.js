import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import classnames from 'classnames';
import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';

class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            score: 0,
            hints: 3,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            previousRandomNumbers: [],
            time: {}

        };
        this.interval = null
    }
    componentDidMount() {
        const { Questions, currentQuestion, previousQuestion, nextQuestion } = this.state;
        this.displayQuestions(Questions, currentQuestion, previousQuestion, nextQuestion);
        this.startTimer();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer,
                previousRandomNumbers: []
            }, () => {
                this.showOptions();
                this.handleDisabledButton();
            });
        }
    }
    handleNextButtonClick = () => {
        this.startTimer();
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            })
        }
        clearInterval(this.interval);
        this.startTimer();
    }
    // handlePreviousButtonClick = () => {
    //     if (this.state.previousQuestion !== undefined) {
    //         this.setState(prevState => ({
    //             currentQuestionIndex: prevState.currentQuestionIndex - 1
    //         }), () => {
    //             this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
    //         })
    //     }
    // }
    handleQuitButtonClick = () => {
        if (window.confirm('Are you sure?')) {
            // this.props.history.push('/play/results');
            const { state } = this;
            const playerStats = {
                score: state.score,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers
            };
            setTimeout(() => {
                this.props.history.push('/play/results', playerStats);
            })
        }
    }
    handleOptionClick = (e) => {        
        if (e.target.innerHTML === this.state.answer) {
            this.correctAnswer();
        } else {
            this.incorrectAnswer();
        }
        clearInterval(this.interval);
        this.startTimer();
    }
    correctAnswer = () => {
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,

        }), () => {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        });
    }
    incorrectAnswer = () => {
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,

        }), () => {
            if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        });
    }
    showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible'
        })
    }
    handleHints = () => {
        if (this.state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;
            options.forEach((option, index) => {
                if (option.innerHTML === this.state.answer) {
                    indexOfAnswer = index;
                }
            });
            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                        }
                    });
                    break;
                }
                if (this.state.previousRandomNumbers.length >= 3) break;
            }
        }
    }
    // handleFiftyFifty = () => {
    //     if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
    //         const options = document.querySelectorAll('.option');
    //         const randomNumbers = [];
    //         let indexOfAnswer;

    //         options.forEach((option, index) => {
    //             if (option.innerHTML === this.state.answer) {
    //                 indexOfAnswer = index;
    //             }
    //             let count = 0;
    //             do {
    //                 const randomNumber = Math.round(Math.random() * 3);
    //                 if (randomNumber !== indexOfAnswer) {
    //                     if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
    //                         randomNumbers.push(randomNumber);
    //                         count++;
    //                     } else {
    //                         while (true) {
    //                             const newRandomNumber = Math.round(Math.random() * 3);
    //                             if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
    //                                 randomNumbers.push(newRandomNumber);
    //                                 count++;
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 }

    //             } while (count < 2);
    //             options.forEach((option, index) => {
    //                 if (randomNumbers.includes(index)) {
    //                     option.style.visibility = 'hidden';
    //                 }
    //             });
    //             this.setState(prevState => ({
    //                 fiftyFifty: prevState.fiftyFifty - 1,
    //                 usedFiftyFifty: true
    //             }))
    //         })
    //     }

    // }
    startTimer = () => {
        const countDownTime = Date.now() + 60000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
                        this.endGame();
                    } else {
                        this.handleNextButtonClick();
                    }
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000);
    }
    handleDisabledButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            })
        } else {
            this.setState({
                previousButtonDisabled: false
            })
        }
        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            })
        } else {
            this.setState({
                nextButtonDisabled: false
            })
        }

    }
    endGame = () => {
        alert('Quiz has ended');
        const { state } = this;
        const playerStats = {
            score: state.score,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        };
        setTimeout(() => {
            this.props.history.push('/play/results', playerStats);
        })

    }
    render() {
        const { currentQuestion, currentQuestionIndex, time, hints, numberOfQuestions } = this.state;
        return (
            <Fragment>
                <Helmet><title>Quiz</title></Helmet>
                <div className='questions'>
                    <h3>Questions</h3>
                    <div className='lifeline-container'>
                        {/* <button onClick={this.handleFiftyFifty} className='lifeline'>50-50</button> */}
                        <button onClick={this.handleHints} className='lifeline'>Hint</button>
                    </div>
                    <div className='timer-container'>
                        <span className='left'>{currentQuestionIndex + 1} of 20</span>
                        <span className='right'>{time.minutes}:{time.seconds}</span>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className='options-container'>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className='option'>{currentQuestion.optionB}</p>
                    </div>
                    <div className='options-container'>
                        <p onClick={this.handleOptionClick} value={'abc'} className='option'>{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} value={'abc'} className='option'>{currentQuestion.optionD}</p>
                    </div>
                    <div className='button-container'>
                        {/* <button className={classnames('', { 'disable': this.state.previousButtonDisabled })} onClick={this.handlePreviousButtonClick}>Previous</button> */}
                        <button className={classnames('', { 'disable': this.state.nextButtonDisabled })} onClick={this.handleNextButtonClick}>Next</button>
                        <button onClick={this.handleQuitButtonClick}>Submit</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Play