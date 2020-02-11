import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Question from './question/question';
import callback from './callback';
import Home from './home/home';
import Tools from './Tools/tools';
import Temperature from './Temperature/temperature';
import Calculator from './calculator/calculator';
import TicTacToe from './TicTacToe/TicTacToe';
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/tools' component={Tools} />
        <Route exact path='/tools/converter' component={Temperature} />
        <Route exact path='/tools/calculator' component={Calculator} />
        <Route exact path='/question/:questionId' component={Question} />
        <Route exact path='/callback' component={callback} />
        <Route exact path='/tools/tictactoe' component={TicTacToe} />
      </div>
    )
  }
}

export default App;
