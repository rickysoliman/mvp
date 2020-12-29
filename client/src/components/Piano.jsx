import React from 'react';
import styled from 'styled-components';

const Keyboard = styled.div`
    display: flex;
    box-shadow: 5px 10px;
`;

const WhiteKey = styled.div`
    width: 100px;
    height: 400px;
    background-color: white;
    border: 1px solid black;
    &:focus {
        background-color: #D3D3D3;
    }
    &:hover {
        cursor: pointer;
    }
`;

const BlackKey = styled.div`
    width: 60px;
    height: 240px;
    background-color: black;
    margin-left: -30px;
    margin-right: -30px;
    z-index: 2;
    border: 1px solid black;
    &:focus {
        background-color: gray;
    }
    &:hover {
        cursor: pointer;
    }
`;

class Piano extends React.Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var noteName = e.target.id;
        console.log(noteName);
        this.props.savePendingAnswer(noteName);
        var audio = document.getElementById(`${noteName}note`);
        audio.play();
    }

    render() {
        return (
            <>
                <Keyboard>
                    <WhiteKey onClick={this.handleClick} id="C" class="key white"></WhiteKey>
                    <BlackKey onClick={this.handleClick} id="Db" class="key black"></BlackKey>
                    <WhiteKey onClick={this.handleClick} id="D" class="key white"></WhiteKey>
                    <BlackKey onClick={this.handleClick} id="Eb" class="key black"></BlackKey>
                    <WhiteKey onClick={this.handleClick} id="E" class="key white"></WhiteKey>
                    <WhiteKey onClick={this.handleClick} id="F" class="key white"></WhiteKey>
                    <BlackKey onClick={this.handleClick} id="Gb" class="key black"></BlackKey>
                    <WhiteKey onClick={this.handleClick} id="G" class="key white"></WhiteKey>
                    <BlackKey onClick={this.handleClick} id="Ab" class="key black"></BlackKey>
                    <WhiteKey onClick={this.handleClick} id="A" class="key white"></WhiteKey>
                    <BlackKey onClick={this.handleClick} id="Bb" class="key black"></BlackKey>
                    <WhiteKey onClick={this.handleClick} id="B" class="key white"></WhiteKey>
                </Keyboard>

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
            </>
        )
    }
}

export default Piano;

