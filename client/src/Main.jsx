import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoteNamesQuiz from './components/NoteNamesQuiz.jsx';
import ChordsQuiz from './components/ChordsQuiz.jsx';
import IntervalsQuiz from './components/IntervalsQuiz.jsx';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/notenames' component={NoteNamesQuiz}></Route>
      <Route exact path='/chords' component={ChordsQuiz}></Route>
      <Route exact path='/intervals' component={IntervalsQuiz}></Route>
    </Switch>
  );
}

export default Main;