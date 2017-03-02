import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../store/store.config'
import Cell from './Cell'
import * as actions from '../actions/actiontypes'
import 'aframe';
import 'aframe-layout-component';
import 'aframe-keyboard-roto-component'

class Board extends Component {
  constructor(props) {
    super(props)
  }

  renderCells(){
    return Object.keys(this.props.board).map(key => {
      return (
        <Cell
          key={key}
          position={key}
          color={this.props.board[key]}
        ></Cell>
      )
    })
  }

  render() {
    return (
      
      <a-entity
        position = "0 3 -10"
        keyboard-roto
      >

        {this.renderCells()}
      </a-entity>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    board:state.board    
  }
}

export default connect(mapStateToProps)(Board);