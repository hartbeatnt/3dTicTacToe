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
    let cells = this.props.board.cells;
    if (cells[position]) return;
    cells[position] = this.props.board.turn;
    store.dispatch({
      type: 'PLACE_PIECE',
      cells
    })
  }

  renderCells(){
    return Object.keys(this.props.board.cells).map(key => {
      return (
        <Cell
          key={key}
          position={key}
          placePiece={this.placePiece.bind(this)}
          color={this.props.board.cells[key]}
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