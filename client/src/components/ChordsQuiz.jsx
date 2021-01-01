import React from 'react';
import styled from 'styled-components';
import QuizResults from './QuizResults.jsx';
import QuizIntro from './QuizIntro.jsx';
import QuizQuestion from './QuizQuestion.jsx';

class ChordsQuiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            renderFunctions: this.props.renderFunctions,
            done: false,
            chords: {
                'C': ['C', 'E', 'G'],
                'Db': ['Db', 'F', 'Ab'],
                'D': ['D', 'Eb', 'A'],
                'Eb': ['Eb', 'G', 'Bb'],
                'E': ['E', 'Ab', 'B'],
                'F': ['F', 'A', 'C'],
                'Gb': ['Gb', 'Bb', 'Db'],
                'G': ['G', 'B', 'D'],
                'Ab': ['Ab', 'C', 'Eb'],
                'A': ['A', 'Db', 'E'],
                'Bb': ['Bb', 'D', 'F'],
                'B': ['B', 'Eb', 'Gb']
            },
            notes: [
                'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
            ],
            currentQuestionIndex: 0,
            answers: [],
            pendingAnswer: [],
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
        this.setState({
            notes: this.shuffle(this.state.notes),
            answers: []
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
            pendingAnswer: []
        });
        this.nextQuestion();
    }

    savePendingAnswer(answer) {
        if (this.state.pendingAnswer.length === 3) {
            return;
        } else {
            var updatedAnswers = this.state.pendingAnswer;
            updatedAnswers.push(answer);
            this.setState({
                pendingAnswer: updatedAnswers
            });
        }
    }

    beginQuiz() {
        this.setState({
            begun: true
        });
    }

    render() {
        if (this.state.done) {
            return <QuizResults answers={this.state.answers} questions={this.state.notes} renderFunctions={this.state.renderFunctions} user={this.state.user} chords={this.state.chords}/>
        } else {
            if (this.state.begun) {
                return (
                    <QuizQuestion quizType={'chords'} question={this.state.notes[this.state.currentQuestionIndex]} savePendingAnswer={this.savePendingAnswer} saveAnswer={this.saveAnswer}/>
                )
            } else {
                return <QuizIntro quizType={'chords'} beginQuiz={this.beginQuiz}/>
            }
        }
    }
}

export default ChordsQuiz;