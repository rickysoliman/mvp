import React from 'react';
import QuizQuestion from './QuizQuestion.jsx';
import QuizResults from './QuizResults.jsx';
import QuizIntro from './QuizIntro.jsx';
import styled from 'styled-components';

class NoteNamesQuiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            renderFunctions: this.props.renderFunctions,
            done: false,
            notes: [
                'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
            ],
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
        this.resetAnswer = this.resetAnswer.bind(this);
    }

    componentWillMount() {
        this.setState({
            notes: this.shuffle(this.state.notes)
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
        if (this.state.currentQuestionIndex === this.state.notes.length - 1) {
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
        if (this.state.pendingAnswer === '') {
            this.setState({
                pendingAnswer: answer
            });
        }
    }

    beginQuiz() {
        this.setState({
            begun: true
        });
    }

    resetAnswer() {
        this.setState({
            pendingAnswer: ''
        });
    }

    render() {
        if (this.state.done) {
            return <QuizResults answers={this.state.answers} questions={this.state.notes} renderFunctions={this.state.renderFunctions} user={this.state.user}/>
        } else {
            if (this.state.begun) {
                return (
                    <QuizQuestion resetAnswer={this.resetAnswer} number={this.state.currentQuestionIndex} quizType={'note names'} question={this.state.notes[this.state.currentQuestionIndex]} savePendingAnswer={this.savePendingAnswer} saveAnswer={this.saveAnswer}/>
                )
            } else {
                return <QuizIntro quizType={'noteNames'} beginQuiz={this.beginQuiz}/>
            }
        }
    }
}

export default NoteNamesQuiz;