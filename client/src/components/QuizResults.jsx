import React from 'react';
import styled from 'styled-components';
import QuizMenu from './QuizMenu.jsx';
import App from '../App.jsx';

const Button = styled.button`
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

const Div = styled.div`
    font-family: Arial;
    color: white;
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
    }

    componentWillMount() {
        this.calculateResults();
    }

    calculateResults() {
        var questions = this.props.notes;
        var answers = this.props.answers;
        var rightAnswers = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i] === answers[i]) {
                rightAnswers++;
            }
        }
        this.setState({
            correctAnswers: rightAnswers
        });
    }

    returnToMainMenu() {
        this.setState({
            returnToMainMenu: true
        });
    }

    render() {
        var score = Math.round((this.state.correctAnswers / 12) * 100);
        if (this.state.returnToMainMenu) {
            return <App loggedIn={true} user={this.state.user}/>
        } else {
            return (
                <>
                    <Div>You answered {this.state.correctAnswers} out of 12 questions correctly!</Div>
                    <Div>Score: {score}%</Div>
                    <Button onClick={this.returnToMainMenu}>Main Menu</Button>
                </>
            )
        }
    }
}

export default QuizResults;