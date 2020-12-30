import React from 'react';
import styled from 'styled-components';
import Key from './Key.jsx';

const Container = styled.div`
    display: flex;
    box-shadow: 5px 10px;
`;

class Keyboard extends React.Component {
    constructor(props) {
        super(props);

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
            <Container>
                <Key color={'white'} selected={false} onClick={this.handleClick} id="C" class="key white"></Key>
                <Key color={'black'} selected={false} onClick={this.handleClick} id="Db" class="key black"></Key>
                <Key color={'white'} selected={false} onClick={this.handleClick} id="D" class="key white"></Key>
                <Key color={'black'} selected={false} onClick={this.handleClick} id="Eb" class="key black"></Key>
                <Key color={'white'} selected={false} onClick={this.handleClick} id="E" class="key white"></Key>
                <Key color={'white'} selected={false} onClick={this.handleClick} id="F" class="key white"></Key>
                <Key color={'black'} selected={false} onClick={this.handleClick} id="Gb" class="key black"></Key>
                <Key color={'white'} selected={false} onClick={this.handleClick} id="G" class="key white"></Key>
                <Key color={'black'} selected={false} onClick={this.handleClick} id="Ab" class="key black"></Key>
                <Key color={'white'} selected={false} onClick={this.handleClick} id="A" class="key white"></Key>
                <Key color={'black'} selected={false} onClick={this.handleClick} id="Bb" class="key black"></Key>
                <Key color={'white'} selected={false} onClick={this.handleClick} id="B" class="key white"></Key>

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
            </Container>
        )
    }
}

export default Keyboard;