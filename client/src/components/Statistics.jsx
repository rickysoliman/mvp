import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import QuizMenu from './QuizMenu';

const MainView = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    justify-content: center;
    margin: 30px;
`;

const Message = styled.div`
    align: center;
    font-family: Arial;
    color: white;
    font-size: 2em;
`;

const Container = styled.div`
    display: inline-block;
    margin: auto;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // margin: 3em;
    // max-width: auto%;
    // max-height: auto;
    // overflow: auto;

    // text-align: center;
    background-color: #ABB6C8;
    border-radius: 15px;
    // width: 30em;
    box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

const SmallButton = styled.div`
    text-align: center;
    vertical-align: middle;
    margin: auto;
    font-family: Arial;
    color: white;
    z-index: 2;
    margin: 2em;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

class Statistics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderFunctions: this.props.renderFunctions,
            user: this.props.user,
            user_id: this.props.user_id,
            segregatedResults: {},
            noteNamesAverage: 0,
            chordsAverage: 0,
            intervalsAverage: 0,
            overallAverage: 0,
            returnToMenu: false
        }

        this.returnToMenu = this.returnToMenu.bind(this);
    }

    returnToMenu() {
        // this.props.returnToMenu();
        this.setState({
            returnToMenu: true
        });
    }

    componentWillMount() {
        axios.get(`/api/quizresults/${this.state.user_id}`)
            .then(res => {
                var data = res.data;

                var segregatedResults = {
                    noteNames: [],
                    chords: [],
                    intervals: []
                };

                var totalScore = 0;

                for (let i = 0; i < data.length; i++) {
                    var quiz_type = data[i].quiz_type;
                    var score = data[i].score;
                    if (quiz_type === 'note names') {
                        segregatedResults.noteNames.push(score);
                    } else if (quiz_type === 'chords') {
                        segregatedResults.chords.push(score);
                    } else if (quiz_type === 'intervals') {
                        segregatedResults.intervals.push(score);
                    }
                    totalScore += score;
                }

                var overallAverage = Math.round(totalScore / data.length);

                this.setState({
                    segregatedResults: segregatedResults,
                    overallAverage: overallAverage
                });

                var noteNamesTotal = 0;
                for (let i = 0; i < this.state.segregatedResults.noteNames.length; i++) {
                    noteNamesTotal += this.state.segregatedResults.noteNames[i];
                }
                var noteNamesAverage = noteNamesTotal / this.state.segregatedResults.noteNames.length;

                var chordsTotal = 0;
                for (let i = 0; i < this.state.segregatedResults.chords.length; i++) {
                    chordsTotal += this.state.segregatedResults.chords[i];
                }
                var chordsAverage = chordsTotal / this.state.segregatedResults.chords.length;

                var intervalsTotal = 0;
                for (let i = 0; i < this.state.segregatedResults.intervals.length; i++) {
                    intervalsTotal += this.state.segregatedResults.intervals[i];
                }
                var intervalsAverage = intervalsTotal / this.state.segregatedResults.intervals.length;

                this.setState({
                    noteNamesAverage: noteNamesAverage,
                    chordsAverage: chordsAverage,
                    intervalsAverage: intervalsAverage
                });
            })
            .catch(err => {
                console.log(err.stack);
            });
    }

    render() {
        if (this.state.returnToMenu) {
            return <QuizMenu renderFunctions={this.state.renderFunctions} user={this.state.user} logOut={this.props.logOut}/>
        } else {
            return (
                <MainView>
                    <Container>
                        <Message>Statistics</Message>
                        <Message>Note Names Average: {this.state.noteNamesAverage}%</Message>
                        <Message>Chords Average: {this.state.chordsAverage}%</Message>
                        <Message>Intervals Average: {this.state.intervalsAverage}%</Message>
                        <Message>Overall Average Score: {this.state.overallAverage}%</Message>
                    </Container>
                    <SmallButton onClick={this.returnToMenu}>Return to Menu</SmallButton>
                </MainView>
            )
        }
    }
}

export default Statistics;