import React from 'react';
import styled from 'styled-components';

const OuterView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    position: absolute;
    right: 45%;
`;

const MainView = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    justify-content: center;
    margin: 30px;
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

const Message = styled.div`
    align: center;
    font-family: Arial;
    color: white;
    font-size: 2em;
`;

const Div = styled.div`
    font-family: Arial;
    color: white;
    margin-top: 10px;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

const SpeechBubble = styled.div`
    position: absolute;
    right: 20%;
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

class QuizMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderFunctions: this.props.renderFunctions
        }
    }

    render() {
        return (
            <OuterView>
                <Img src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/teacher.png"></Img>
                <SpeechBubble>
                    <MainView>
                        <Message>Hello, {this.props.user}! What would you like to be quizzed on today?</Message>
                        <Button onClick={this.state.renderFunctions.noteNames}>Note Names</Button>
                        <Button onClick={this.state.renderFunctions.chords}>Major Chords</Button>
                        <Button onClick={this.state.renderFunctions.intervals}>Intervals</Button>
                        <Div onClick={this.props.logOut}>Log Out</Div>
                    </MainView>
                </SpeechBubble>
            </OuterView>
        )
    }
}

export default QuizMenu;