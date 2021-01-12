import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import QuizMenu from './QuizMenu';

const MainView = styled.div`
    display: inline-block;
    margin: auto;
    text-align: center;
    width: 250px;
    height: 300px;
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
    text-align: center;
    font-family: Courier;
    color: gray;
    font-size: 0.75em;
    padding: 10px;

    list-style: none;
    border-bottom: 1px dotted #ccc;
    text-indent: 25px;
    height: 100%;
    // padding: 10px;
    text-transform: capitalize;
`;

const Lines = styled.div`
    border-left: 1px solid #ffaa9f;
    border-right: 1px solid #ffaa9f;
    width: 2px;
    float: left;
    height: 100%;
    margin-left: 40px;
`;

const StatContainer = styled.div`
    color: #555;
    font-size: 22px;
    padding: 0 !important;
    width: 100%;
    font-family: courier, monospace;
    border: 1px solid #dedede;

    // padding: 15px;
    // width: fit-content;
    // height: fit-content;
`;

const Paper = styled.div`
    background-color: #f5f5f5;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    height: 100%;

    // display: inline-block;
    // margin: auto;
    // background-color: #ABB6C8;
    // border-radius: 15px;
    // text-align: left;
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

const Grade = styled.div`
    color: red;
    font-size: 2em;
`;

const NoQuizzes = styled.div`
    font-family: Tahoma;
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
                for (let i = 0; i < segregatedResults.noteNames.length; i++) {
                    noteNamesTotal += segregatedResults.noteNames[i];
                }
                var noteNamesAverage = Math.round(noteNamesTotal / segregatedResults.noteNames.length);

                var chordsTotal = 0;
                for (let i = 0; i < segregatedResults.chords.length; i++) {
                    chordsTotal += segregatedResults.chords[i];
                }
                var chordsAverage = Math.round(chordsTotal / segregatedResults.chords.length);

                var intervalsTotal = 0;
                for (let i = 0; i < segregatedResults.intervals.length; i++) {
                    intervalsTotal += segregatedResults.intervals[i];
                }
                var intervalsAverage = Math.round(intervalsTotal / segregatedResults.intervals.length);

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
        var score = this.state.overallAverage;
        var grade;
        var message;
        if (score >= 90 && score <= 100) {
            if (score >= 90 && score <= 93) {
                grade = 'A-';
            } else if (score >= 94 && score <= 96) {
                grade = 'A';
            } else if (score >= 97 && score <= 100) {
                grade = 'A+';
            }
            message = 'Fantastic work!';
        }
        if (score >= 80 && score <= 89) {
            if (score >= 80 && score <= 83) {
                grade = 'B-';
            } else if (score >= 84 && score <= 86) {
                grade = 'B';
            } else if (score >= 87 && score <= 89) {
                grade = 'B+';
            }
            message = 'Nice job!';
        }
        if (score >= 70 && score <= 79) {
            if (score >= 70 && score <= 73) {
                grade = 'C-';
            } else if (score >= 74 && score <= 76) {
                grade = 'C';
            } else if (score >= 77 && score <= 79) {
                grade = 'C+';
            }
            message = 'Great effort. Maybe spend a little more time studying and we\'ll get that score up!';
        }
        if (score >= 60 && score <= 69) {
            if (score >= 60 && score <= 63) {
                grade = 'D-';
            } else if (score >= 64 && score <= 66) {
                grade = 'D';
            } else if (score >= 67 && score <= 69) {
                grade = 'D+';
            }
            message = 'Could be better. Let\'s spend a little more time studying.';
        }
        if (score >= 0 && score <= 59) {
            grade = 'F';
            message = 'Yikes. Not so great. Let\'s spend some more time studying.';
        }
        if (this.state.returnToMenu) {
            return <QuizMenu renderFunctions={this.state.renderFunctions} user={this.state.user} logOut={this.props.logOut}/>
        } else {
            if (this.state.noQuizzes) {
                return (
                    <MainView>
                        <NoQuizzes>You haven't taken any quizzes. Start quizzing yourself to see your results!</NoQuizzes>
                        <SmallButton onClick={this.returnToMenu}>Return to Menu</SmallButton>
                    </MainView>
                )
            } else {
                return (
                    <MainView>
                        <Title>Statistics</Title>
                        <Paper>
                            <Lines/>
                            <StatContainer>
                                <Message>Note Names: {this.state.noteNamesAverage}%</Message>
                            </StatContainer>
                            <StatContainer>
                                <Message>Chords: {this.state.chordsAverage}%</Message>
                            </StatContainer>
                            <StatContainer>
                                <Message>Intervals: {this.state.intervalsAverage}%</Message>
                            </StatContainer>
                            <StatContainer>
                                <Message>Overall Score: {this.state.overallAverage}%</Message>
                            </StatContainer>
                            <StatContainer>
                                <div>Overall Grade:</div>
                                <Grade>{grade}</Grade>
                            </StatContainer>
                            <StatContainer>
                                <div>{message}</div>
                            </StatContainer>
                        </Paper>
                        <SmallButton onClick={this.returnToMenu}>Return to Menu</SmallButton>
                    </MainView>
                )
            }
        }
    }
}

export default Statistics;