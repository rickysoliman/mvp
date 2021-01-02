import React from 'react';
import styled from 'styled-components';

const MainView = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
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

const Div = styled.div`
    display: flex;
    justify-content: center;
    font-family: Arial;
    color: white;
    font-size: 2em;
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
            <>
                <MainView>
                    <Div>Hello, {this.props.user}! What would you like to be quizzed on today?</Div>
                    <Button onClick={this.state.renderFunctions.noteNames}>Note Names</Button>
                    <Button onClick={this.state.renderFunctions.chords}>Chords</Button>
                    <Button onClick={this.state.renderFunctions.intervals}>Intervals</Button>
                </MainView>
                <Button onClick={this.props.logOut}>Log Out</Button>
            </>
        )
    }
}

export default QuizMenu;