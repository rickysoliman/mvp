import React from 'react';
import styled from 'styled-components';
import App from '../App.jsx';

const Title = styled.h1`
    font-family: Tahoma;
    color: black;
`;

const MainView = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    justify-content: center;
    margin: 30px;
`;

const Div = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    color: white;
    font-size: 15px;
`;

const Button = styled.button`
    margin-top: 40px
    border-radius: 10px;
    background-color: light-gray;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    &:hover {
        cursor: pointer;
    }
`;

const SpeechBubble = styled.div`
	position: relative;
    display: flex;
    justify-content: center;
    background-color: #ABB6C8;
    border-radius: 15px;
    width: 30em;
    box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

    &:after {
        content: '';
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
    font-family: Arial;
    color: black;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
    }
`;

class QuizResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            correctAnswers: 0,
            returnToMainMenu: false,
            user: this.props.user,
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
        if (this.props.chords) {
            var chords = this.props.chords;
            for (let i = 0; i < questions.length; i++) {
                var note = questions[i];
                var actual = answers[i];
                var expected = chords[note];
                console.log('actual:');
                console.log(actual);
                console.log('expected:');
                console.log(expected);
                if (this.compareArrays(actual, expected)) {
                    rightAnswers++;
                }
            }
            this.setState({
                correctAnswers: rightAnswers
            });
        } else {
            for (let i = 0; i < questions.length; i++) {
                if (questions[i] === answers[i]) {
                    rightAnswers++;
                }
            }
            this.setState({
                correctAnswers: rightAnswers
            });
        }
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
            var score = Math.round((this.state.correctAnswers / this.props.questions.length) * 100);
            var grade;
            var message;
            if (score >= 90 && score <= 100) {
                grade = 'A';
                message = 'Fantastic work!';
            }
            if (score >= 80 && score <= 89) {
                grade = 'B';
                message = 'Nice job!';
            }
            if (score >= 70 && score <= 79) {
                grade = 'C';
                message = 'Great effort. Maybe spend a little more time studying and we\'ll get that score up!';
            }
            if (score >= 60 && score <= 69) {
                grade = 'D';
                message = 'Could be better. Let\'s spend a little more time studying.';
            }
            if (score >= 0 && score <= 59) {
                grade = 'F';
                message = 'Yikes. Not so great. Let\'s spend some more time studying.';
            }
            return (
                <>
                    <Title>Your final grade is: {grade}.</Title>
                    <SpeechBubble>
                        <MainView>
                            <Div>You answered {this.state.correctAnswers} out of {this.props.questions.length} questions correctly.</Div>
                            <Div>Score: {score}%</Div>
                            <Div>{message}</Div>
                            <SmallButton onClick={this.returnToMainMenu}>Main Menu</SmallButton>
                        </MainView>
                    </SpeechBubble>
                </>
            )
        }
    }
}

export default QuizResults;