import React from 'react';
import styled from 'styled-components';
import Key from './Key.jsx';

const Keyboard = styled.div`
    display: flex;
    box-shadow: 5px 10px;
`;

class Piano extends React.Component {
    constructor() {
        super();

        // this.handleClick = this.handleClick.bind(this);
    }

    // handleClick(e) {
    //     var noteName = e.target.id;
    //     console.log(noteName);
    //     this.props.savePendingAnswer(noteName);
    //     var audio = document.getElementById(`${noteName}note`);
    //     audio.play();
    // }

    render() {
        return (
            <>
                <Keyboard quizType={this.props.quizType}/>
            </>
        )
    }
}

export default Piano;

