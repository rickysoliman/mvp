import React from 'react';
import styled from 'styled-components';

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
    font-size: 2em;
`;

const Button = styled.button`
    border-radius: 10px;
    background-color: light-gray;
    border: 2px solid black;
    color: black;
    padding: 15px 32px;
    margin-top: 30px;
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

class QuizIntro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            message: ''
        }
    }

    componentWillMount() {
        if (this.props.quizType === 'noteNames') {
            this.setState({
                title: 'Note Names',
                message: 'For this quiz, please select the correct key based on the given note name. There will be twelve questions total. Good luck!'
            });
        } else if (this.props.quizType === 'chords') {
            this.setState({
                title: 'Major Chords',
                message: 'For this quiz, please select the three notes that make up the given major chord. There will be twelve questions total. Good luck!'
            });
        } else if (this.props.quizType === 'intervals') {
            this.setState({
                title: 'Intervals',
                message: 'For this quiz, you will be given an interval. Please select the note that is the given interval above C. There will be eleven questions total. Good luck!'
            });
        }
    }

    render() {
        return (
            <>
                <Title>{this.state.title}</Title>
                <SpeechBubble>
                    <MainView>
                        <Div>{this.state.message}</Div>
                        <Button onClick={this.props.beginQuiz}>Begin Quiz</Button>
                    </MainView>
                </SpeechBubble>
            </>
        )
    }
}

export default QuizIntro;