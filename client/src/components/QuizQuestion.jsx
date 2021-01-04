import React from 'react';
import Keyboard from './Keyboard.jsx';
import styled from 'styled-components';

const Title = styled.h1`
    font-family: Tahoma;
    color: black;
`;

const MainView = styled.div`
    display: flex;
    flex-direction: column;
`;

class QuizQuestion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.quizType === 'chords') {
            return (
                <MainView>
                    <Title>{this.props.number + 1}. {this.props.question} major</Title>
                    <Keyboard questionNumber={this.props.number + 1} resetAnswer={this.props.resetAnswer} quizType={this.props.quizType} savePendingAnswer={this.props.savePendingAnswer} saveAnswer={this.props.saveAnswer}/>
                </MainView>
            )
        } else if (this.props.quizType === 'intervals') {
            return (
                <MainView>
                    <Title>{this.props.number + 1}. {this.props.question} above C</Title>
                    <Keyboard questionNumber={this.props.number + 1} resetAnswer={this.props.resetAnswer} quizType={this.props.quizType} savePendingAnswer={this.props.savePendingAnswer} saveAnswer={this.props.saveAnswer}/>
                </MainView>
            )
        } else {
            return (
                <MainView>
                    <Title>{this.props.number + 1}. {this.props.question}</Title>
                    <Keyboard questionNumber={this.props.number + 1} resetAnswer={this.props.resetAnswer} quizType={this.props.quizType} savePendingAnswer={this.props.savePendingAnswer} saveAnswer={this.props.saveAnswer}/>
                </MainView>
            )
        }
    }
}

export default QuizQuestion;