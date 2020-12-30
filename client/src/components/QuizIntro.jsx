import React from 'react';
import styled from 'styled-components';

const MainView = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
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

class QuizIntro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

    componentWillMount() {
        if (this.props.quizType === 'noteNames') {
            this.setState({
                message: 'For this quiz, please select the correct key based on the given note name. There will be twelve questions total. Good luck!'
            });
        } else if (this.props.quizType === 'chords') {
            this.setState({
                message: 'For this quiz, please select the three notes that make up the given major chord. There will be twelve questions total. Good luck!'
            });
        } else if (this.props.quizType === 'intervals') {
            this.setState({
                message: 'For this quiz, you will be given an interval. Please select the note that is the given interval above C. There will be eleven questions total. Good luck!'
            });
        }
    }

    render() {
        return (
            <MainView>    
                <Div>{this.state.message}</Div>
                <Button onClick={this.props.beginQuiz}>Begin Quiz</Button>
            </MainView>
        )
    }
}

export default QuizIntro;