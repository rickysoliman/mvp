import React from 'react';
import styled from 'styled-components';
import Key from './Key.jsx';

const Board = styled.div`
    display: flex;
    box-shadow: 5px 10px;
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

class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'C': false,
            'Db': false,
            'D': false,
            'Eb': false,
            'E': false,
            'F': false,
            'Gb': false,
            'G': false,
            'Ab': false,
            'A': false,
            'Bb': false,
            'B': false
        }

        this.handleClick = this.handleClick.bind(this);
        this.resetAnswer = this.resetAnswer.bind(this);
        this.saveAnswerAndResetKeyboard = this.saveAnswerAndResetKeyboard.bind(this);
    }

    componentWillMount() {
        this.setState({
            'C': false,
            'Db': false,
            'D': false,
            'Eb': false,
            'E': false,
            'F': false,
            'Gb': false,
            'G': false,
            'Ab': false,
            'A': false,
            'Bb': false,
            'B': false
        });
    }

    handleClick(e) {
        var noteName = e.target.id;
        console.log(noteName);
        this.props.savePendingAnswer(noteName);
        if (this.props.quizType === 'note names' || this.props.quizType === 'intervals') {
            var updatedState = this.state;
            var selectedCount = 0;
            for (var note in updatedState) {
                if (updatedState[note]) {
                    selectedCount++;
                }
            }
            if (selectedCount === 0) {
                updatedState[noteName] = true;
                this.setState(updatedState);
                var audio = document.getElementById(`${noteName}note`);
                audio.play();
            }
        } else if (this.props.quizType === 'chords') {
            var updatedState = this.state;
            var selectedCount = 0;
            for (var note in updatedState) {
                if (updatedState[note]) {
                    selectedCount++;
                }
            }
            if (selectedCount < 3) {
                this.setState({
                    [noteName]: true
                });
                var audio = document.getElementById(`${noteName}note`);
                audio.play();
            }
        }
    }

    resetAnswer() {
        this.props.resetAnswer();
        this.setState({
            'C': false,
            'Db': false,
            'D': false,
            'Eb': false,
            'E': false,
            'F': false,
            'Gb': false,
            'G': false,
            'Ab': false,
            'A': false,
            'Bb': false,
            'B': false
        });
    }

    saveAnswerAndResetKeyboard() {
        this.props.saveAnswer();
        this.setState({
            'C': false,
            'Db': false,
            'D': false,
            'Eb': false,
            'E': false,
            'F': false,
            'Gb': false,
            'G': false,
            'Ab': false,
            'A': false,
            'Bb': false,
            'B': false
        });
    }

    render() {
        return (
            <>
                <Board>
                    <Key color={'white'} selected={this.state['C']} onClick={this.handleClick} id="C" class="key white"></Key>
                    <Key color={'black'} selected={this.state['Db']} onClick={this.handleClick} id="Db" class="key black"></Key>
                    <Key color={'white'} selected={this.state['D']} onClick={this.handleClick} id="D" class="key white"></Key>
                    <Key color={'black'} selected={this.state['Eb']} onClick={this.handleClick} id="Eb" class="key black"></Key>
                    <Key color={'white'} selected={this.state['E']} onClick={this.handleClick} id="E" class="key white"></Key>
                    <Key color={'white'} selected={this.state['F']} onClick={this.handleClick} id="F" class="key white"></Key>
                    <Key color={'black'} selected={this.state['Gb']} onClick={this.handleClick} id="Gb" class="key black"></Key>
                    <Key color={'white'} selected={this.state['G']} onClick={this.handleClick} id="G" class="key white"></Key>
                    <Key color={'black'} selected={this.state['Ab']} onClick={this.handleClick} id="Ab" class="key black"></Key>
                    <Key color={'white'} selected={this.state['A']} onClick={this.handleClick} id="A" class="key white"></Key>
                    <Key color={'black'} selected={this.state['Bb']} onClick={this.handleClick} id="Bb" class="key black"></Key>
                    <Key color={'white'} selected={this.state['B']} onClick={this.handleClick} id="B" class="key white"></Key>
    
                    <audio id="Cnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/C.mp3"></audio>
                    <audio id="Dbnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/Db.mp3"></audio>
                    <audio id="Dnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/D.mp3"></audio>
                    <audio id="Ebnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/Eb.mp3"></audio>
                    <audio id="Enote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/E.mp3"></audio>
                    <audio id="Fnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/F.mp3"></audio>
                    <audio id="Gbnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/Gb.mp3"></audio>
                    <audio id="Gnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/G.mp3"></audio>
                    <audio id="Abnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/Ab.mp3"></audio>
                    <audio id="Anote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/A.mp3"></audio>
                    <audio id="Bbnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/Bb.mp3"></audio>
                    <audio id="Bnote" src="https://rickyspianonotes.s3-us-west-1.amazonaws.com/B.mp3"></audio>
                </Board>
                <Button onClick={this.resetAnswer}>Reset</Button>
                <Button onClick={this.saveAnswerAndResetKeyboard}>Submit</Button>
            </>
        )
    }
}

export default Keyboard;