import React, {Component} from 'react';
import { connect } from 'react-redux';
import store from '../store/store.config'
import Cell from './Cell'
import * as actions from '../actions/actiontypes'
import 'aframe';
import 'aframe-keyboard-roto-component';
// import 'aframe-trackball-component';

class Board extends Component {
  constructor(props) {
    super(props)
  }

  placePiece(position){
    let board = this.props.board;
    board[position] = 'red';
    store.dispatch({
      type: 'PLACE_PIECE',
      board
    })
  }

  renderCells(){
    return Object.keys(this.props.board).map(key => {
      return (
        <Cell
          key={key}
          position={key}
          placePiece={this.placePiece.bind(this)}
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