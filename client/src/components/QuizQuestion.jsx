import React from 'react';
import Keyboard from './Keyboard.jsx';
import styled from 'styled-components';

const MainView = styled.div`
    display: flex;
    flex-direction: column;
`;

const Div = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    color: white;
    font-size: 2em;
`;

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

class QuizQuestion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainView>
                <Div>{this.props.number + 1}. {this.props.question}</Div>
                <Keyboard questionNumber={this.props.number + 1} resetAnswer={this.props.resetAnswer} quizType={this.props.quizType} savePendingAnswer={this.props.savePendingAnswer} saveAnswer={this.props.saveAnswer}/>
                {/* <Button onClick={this.props.saveAnswer}>Submit</Button> */}
            </MainView>
        )
    }
}

export default QuizQuestion;