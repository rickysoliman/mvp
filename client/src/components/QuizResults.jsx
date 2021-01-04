import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import App from '../App.jsx';

const OuterView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    position: absolute;
    right: 45%;
`;

const Title = styled.h1`
    font-family: Tahoma;
    color: black;
    position: relative;
    bottom: 70%;
    right: 20%;
    text-align: center;
    z-index: 2;
`;

const SpeechBubbleView = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    justify-content: center;
    margin: 30px;
`;

const MiddleView = styled.div`
    position: absolute;
    right: 20%;
    bottom: 65%;
`;

const Div = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    color: white;
    font-size: 20px;
    text-align: center;
    margin: auto;
    vertical-align: middle;
`;

const SpeechBubble = styled.div`
    text-align: center;
    margin: auto;
    position: absolute;
    right: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ABB6C8;
    border-radius: 15px;
    width: 20em;
    box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

    &:after {
        position: absolute;
        left: 0%;
        top: 50%;
        width: 0;
        height: 0;
        border: 58px solid transparent;
        border-right-color: #ABB6C8;
        border-left: 0;
        border-bottom: 0;
        margin-top: -10px;
        margin-left: -20px;
    }
`;

const SmallButton = styled.div`
    text-align: center;
    vertical-align: middle;
    margin: auto;
    font-family: Arial;
    color: white;
    z-index: 2;
    margin: 2em;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

class QuizResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            correctAnswers: 0,
            score: 0,
            returnToMainMenu: false,
            user: this.props.user,
            user_id: this.props.user_id,
            quizType: this.props.quizType,
            renderFunctions: this.props.renderFunctions
        }

        this.calculateResults = this.calculateResults.bind(this);
        this.returnToMainMenu = this.returnToMainMenu.bind(this);
        this.compareArrays = this.compareArrays.bind(this);
    }

    compareArrays(a, b) {
        var sameLengths = a.length === b.length;
        var sameValues = true;
        for (let i = 0; i < a.length; i++) {
            if (!b.includes(a[i])) {
                sameValues = false;
                break;
            }
        }
        return (sameLengths && sameValues);
    }

    componentWillMount() {
        this.calculateResults();
    }

    calculateResults() {
        var questions = this.props.questions;
        var answers = this.props.answers;
        var rightAnswers = 0;
        var score;
        var user = this.state.user;
        var user_id = this.state.user_id;
        var quizType = this.state.quizType;
        if (this.props.chords) {
            var chords = this.props.chords;
            for (let i = 0; i < questions.length; i++) {
                var note = questions[i];
                var actual = answers[i];
                var expected = chords[note];
                if (this.compareArrays(actual, expected)) {
                    rightAnswers++;
                }
            }
        } else {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i] === answers[i]) {
                    rightAnswers++;
                }
            }
        }
        score = Math.round((rightAnswers / this.props.questions.length) * 100);
        this.setState({
            correctAnswers: rightAnswers,
            score: score
        });
        axios.post('/api/quizresults', {
            userId: user_id,
            quizType: quizType,
            score: score
        })
        .then(res => {
            console.log('post request for quiz result sent');
            console.log(user_id);
            console.log(quizType);
            console.log(score);
            res.send('post request sent');
        })
        .catch(err => {
            console.log(err.stack);
        });
    }

    returnToMainMenu() {
        this.setState({
            returnToMainMenu: true
        });
    }

    render() {
        if (this.state.returnToMainMenu) {
            return <App loggedIn={true} user={this.state.user}/>
        } else {
            var score = this.state.score;
            var grade;
            var message;
            if (score >= 90 && score <= 100) {
                if (score >= 90 && score <= 93) {
                    grade = 'A-';
                } else if (score >= 94 && score <= 96) {
                    grade = 'A';
                } else if (score >= 97 && score <= 100) {
                    grade = 'A+';
                }
                message = 'Fantastic work!';
            }
            if (score >= 80 && score <= 89) {
                if (score >= 80 && score <= 83) {
                    grade = 'B-';
                } else if (score >= 84 && score <= 86) {
                    grade = 'B';
                } else if (score >= 87 && score <= 89) {
                    grade = 'B+';
                }
                message = 'Nice job!';
            }
            if (score >= 70 && score <= 79) {
                if (score >= 70 && score <= 73) {
                    grade = 'C-';
                } else if (score >= 74 && score <= 76) {
                    grade = 'C';
                } else if (score >= 77 && score <= 79) {
                    grade = 'C+';
                }
                message = 'Great effort. Maybe spend a little more time studying and we\'ll get that score up!';
            }
            if (score >= 60 && score <= 69) {
                if (score >= 60 && score <= 63) {
                    grade = 'D-';
                } else if (score >= 64 && score <= 66) {
                    grade = 'D';
                } else if (score >= 67 && score <= 69) {
                    grade = 'D+';
                }
                message = 'Could be better. Let\'s spend a little more time studying.';
            }
            if (score >= 0 && score <= 59) {
                grade = 'F';
                message = 'Yikes. Not so great. Let\'s spend some more time studying.';
            }
            return (
                <OuterView>
                    <Img src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/teacher.png"></Img>
                    <MiddleView>
                        <Title>Your final grade is: {grade}</Title>
                        <SpeechBubble>
                            <SpeechBubbleView>
                                <Div>You answered {this.state.correctAnswers} out of {this.props.questions.length} questions correctly, giving you a score of {score}% {message}</Div>
                                <SmallButton onClick={this.returnToMainMenu}>Main Menu</SmallButton>
                            </SpeechBubbleView>
                        </SpeechBubble>
                    </MiddleView>
                </OuterView>
            )
        }
    }
}

export default QuizResults;