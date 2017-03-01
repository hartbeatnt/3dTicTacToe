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
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>3DIC 3DAC 3DOE</h2>
        </div>
        <a-scene>
          <a-camera wasd-controls="enabled:false"></a-camera>
          <a-sky color="lightblue"></a-sky>
          <Board />
        </a-scene>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {}
}

export default connect(mapStateToProps)(App);