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
    const cells = Object.keys(this.props.board.cells)
    const winCombos = [];

    cells.forEach(cell=>{
      let x = +cell.slice(0,1)
      let y = +cell.slice(1,2)
      let z = +cell.slice(2)
      if (x===0 && y===0 && z===0)
        winCombos.push([''+x+y+z,''+(x+1)+(y+1)+(z+1),''+(x+2)+(y+2)+(z+2)])
      if (x===0 && y===0)
        winCombos.push([''+x+y+z,''+(x+1)+(y+1)+z,''+(x+2)+(y+2)+z])
      if (x===0 && y===2)
        winCombos.push([''+x+y+z,''+(x+1)+(y-1)+z,''+(x+2)+(y-2)+z])
      if (x===2 && y===0)
        winCombos.push([''+x+y+z,''+(x-1)+(y+1)+z,''+(x-2)+(y+2)+z])
      if (x===0 && z===0)
        winCombos.push([''+x+y+z,''+(x+1)+y+(z+1),''+(x+2)+y+(z+2)])
      if (x===0 && z===2)
        winCombos.push([''+x+y+z,''+(x+1)+y+(z-1),''+(x+2)+y+(z-2)])
      if (x===2 && z===0)
        winCombos.push([''+x+y+z,''+(x-1)+y+(z+1),''+(x-2)+y+(z+2)])
      if (y===0 && z===0)
        winCombos.push([''+x+y+z,''+x+(y+1)+(z+1),''+x+(y+2)+(z+2)])
      if (y===0 && z===2)
        winCombos.push([''+x+y+z,''+x+(y+1)+(z-1),''+x+(y+2)+(z-2)])
      if (y===2 && z===0)
        winCombos.push([''+x+y+z,''+x+(y-1)+(z+1),''+x+(y-2)+(z+2)])
      if (x===0) winCombos.push([''+x+y+z,''+(x+1)+y+z,''+(x+2)+y+z]);
      if (y===0) winCombos.push([''+x+y+z,''+x+(y+1)+z,''+x+(y+2)+z]);
      if (z===0) winCombos.push([''+x+y+z,''+x+y+(z+1),''+x+y+(z+2)]);
    })
    
    this.winCombos = winCombos;
  }

  placePiece(position){
    let cells = this.props.board.cells;
    if (cells[position]) return;
    cells[position] = this.props.board.turn;
    store.dispatch({
      type: 'PLACE_PIECE',
      cells
    })
    console.log(position)
    this.winCheck(position)
  }

  winCheck(position) {
    const board = this.state.board.cells;
    const check = arr => {
      return arr.every(cell=>cell===board[position])
    }
        
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
        position="0 3 -10"
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