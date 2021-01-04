import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import QuizResults from './components/QuizResults.jsx';
import QuizIntro from './components/QuizIntro.jsx';

ReactDOM.render(<App/>, document.getElementById('root'));

// ReactDOM.render(<QuizResults answers={[]} questions={[
//     'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
// ]} renderFunctions={() => {}} user={'Ricky'}/>, document.getElementById('root'));

// ReactDOM.render(<QuizIntro quizType={'intervals'} beginQuiz={() => {}}/>, document.getElementById('root'));