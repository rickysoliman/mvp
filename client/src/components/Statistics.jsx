import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import QuizMenu from './QuizMenu';

const MainView = styled.div`
    display: inline-block;
    margin: auto;
    text-align: center;
    width: 50%;
    margin: 30px;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-family: Tahoma;
    font-size: 1.5em;
    text-decoration: underline;
    color: black;
    // position: relative;
    // bottom: 70%;
    // right: 20%;
    text-align: center;
    z-index: 2;
`;

const Message = styled.div`
    align: center;
    font-family: Arial;
    color: white;
    font-size: 1em;
`;

const StatContainer = styled.div`
    // display: inline-block;
    // text-align: left;
    padding: 15px;
    width: fit-content;
    height: fit-content;
`;

const Container = styled.div`
    display: inline-block;
    margin: auto;
    background-color: #ABB6C8;
    border-radius: 15px;
    text-align: left;
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
            returnToMenu: false,
            noQuizzes: false
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
        this.setState({
            noteNamesAverage: 0,
            chordsAverage: 0,
            intervalsAverage: 0,
            overallAverage: 0
        });
        axios.get(`/api/quizresults/${this.state.user_id}`)
            .then(res => {
                var data = res.data;
                if (data.length === 0) {
                    this.setState({
                        noQuizzes: true
                    });
                }

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

                var noteNamesTotal = 0;
                for (let i = 0; i < this.state.segregatedResults.noteNames.length; i++) {
                    noteNamesTotal += this.state.segregatedResults.noteNames[i];
                }
                var noteNamesAverage = Math.round(noteNamesTotal / this.state.segregatedResults.noteNames.length);

                var chordsTotal = 0;
                for (let i = 0; i < this.state.segregatedResults.chords.length; i++) {
                    chordsTotal += this.state.segregatedResults.chords[i];
                }
                var chordsAverage = Math.round(chordsTotal / this.state.segregatedResults.chords.length);

                var intervalsTotal = 0;
                for (let i = 0; i < this.state.segregatedResults.intervals.length; i++) {
                    intervalsTotal += this.state.segregatedResults.intervals[i];
                }
                var intervalsAverage = Math.round(intervalsTotal / this.state.segregatedResults.intervals.length);

                this.setState({
                    noteNamesAverage: noteNamesAverage,
                    chordsAverage: chordsAverage,
                    intervalsAverage: intervalsAverage,
                    segregatedResults: segregatedResults,
                    overallAverage: overallAverage
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
            if (this.state.noQuizzes) {
                return (
                    <MainView>
                        <Message>You haven't taken any quizzes. Start quizzing yourself to see your results!</Message>
                        <SmallButton onClick={this.returnToMenu}>Return to Menu</SmallButton>
                    </MainView>
                )
            } else {
                return (
                    <MainView>
                        <Container>
                            <Title>Statistics</Title>
                            <StatContainer>
                                <Message>Note Names Average: {this.state.noteNamesAverage}%</Message>
                            </StatContainer>
                            <StatContainer>
                                <Message>Chords Average: {this.state.chordsAverage}%</Message>
                            </StatContainer>
                            <StatContainer>
                                <Message>Intervals Average: {this.state.intervalsAverage}%</Message>
                            </StatContainer>
                            <StatContainer>
                                <Message>Overall Average Score: {this.state.overallAverage}%</Message>
                            </StatContainer>
                        </Container>
                        <SmallButton onClick={this.returnToMenu}>Return to Menu</SmallButton>
                    </MainView>
                )
            }
        }
    }
}

export default Statistics;