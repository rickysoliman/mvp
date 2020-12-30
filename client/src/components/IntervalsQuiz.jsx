import React from 'react';
import styled from 'styled-components';
import QuizResults from './QuizResults.jsx';
import QuizIntro from './QuizIntro.jsx';
import QuizQuestion from './QuizQuestion.jsx';

class IntervalsQuiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            renderFunctions: this.props.renderFunctions,
            done: false,
            intervals: [
                'half step', 'whole step', 'minor third', 'major third', 'perfect fourth', 'tritone', 'perfect fifth', 'minor sixth', 'major sixth', 'minor seventh', 'major seventh'
            ],
            expectedAnswers: [],
            currentQuestionIndex: 0,
            answers: [],
            pendingAnswer: '',
            correctAnswers: 0,
            begun: false
        }

        this.shuffle = this.shuffle.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.saveAnswer = this.saveAnswer.bind(this);
        this.savePendingAnswer = this.savePendingAnswer.bind(this);
        this.beginQuiz = this.beginQuiz.bind(this);
    }

    componentWillMount() {
        var shuffledIntervals = this.shuffle(this.state.intervals);
        var updatedExpectedAnswers = [];
        for (let i = 0; i < shuffledIntervals.length; i++) {
            var current = shuffledIntervals[i];
            if (current === 'half step') {
                updatedExpectedAnswers.push('Db');
            } else if (current === 'whole step') {
                updatedExpectedAnswers.push('D');
            } else if (current === 'minor third') {
                updatedExpectedAnswers.push('Eb');
            } else if (current === 'major third') {
                updatedExpectedAnswers.push('E');
            } else if (current === 'perfect fourth') {
                updatedExpectedAnswers.push('F');
            } else if (current === 'tritone') {
                updatedExpectedAnswers.push('Gb');
            } else if (current === 'perfect fifth') {
                updatedExpectedAnswers.push('G');
            } else if (current === 'minor sixth') {
                updatedExpectedAnswers.push('Ab');
            } else if (current === 'major sixth') {
                updatedExpectedAnswers.push('A');
            } else if (current === 'minor seventh') {
                updatedExpectedAnswers.push('Bb');
            } else if (current === 'major seventh') {
                updatedExpectedAnswers.push('B');
            }
        }
        this.setState({
            intervals: shuffledIntervals,
            expectedAnswers: updatedExpectedAnswers
        });
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    nextQuestion() {
        if (this.state.currentQuestionIndex === this.state.intervals.length - 1) {
            this.setState({
                done: true
            });
        } else {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1
            });
        }
    }

    saveAnswer() {
        var updatedAnswers = this.state.answers;
        updatedAnswers.push(this.state.pendingAnswer);
        this.setState({
            answers: updatedAnswers,
            pendingAnswer: ''
        });
        this.nextQuestion();
    }

    savePendingAnswer(answer) {
        this.setState({
            pendingAnswer: answer
        });
    }

    beginQuiz() {
        this.setState({
            begun: true
        });
    }

    render() {
        if (this.state.done) {
            return <QuizResults answers={this.state.answers} questions={this.state.expectedAnswers} renderFunctions={this.state.renderFunctions} user={this.state.user} chords={this.state.chords}/>
        } else {
            if (this.state.begun) {
                return (
                    <QuizQuestion question={this.state.intervals[this.state.currentQuestionIndex]} savePendingAnswer={this.savePendingAnswer} saveAnswer={this.saveAnswer}/>
                )
            } else {
                return <QuizIntro quizType={'intervals'} beginQuiz={this.beginQuiz}/>
            }
        }
    }
}

export default IntervalsQuiz;