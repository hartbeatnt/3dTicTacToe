import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store.config'
import * as actions from '../actions/actiontypes'
import 'aframe'
import Board from './Board'
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props.board)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <a-scene>
          <Board/>
        </a-scene>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    board:state.board    
  }
}

export default connect(mapStateToProps)(App);