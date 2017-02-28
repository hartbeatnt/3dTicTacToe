import React, {Component} from 'react';
import 'aframe';
import 'aframe-layout-component';

class Board extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <a-entity 
        layout="type:box; columns: 3; margin: 2"
        position="0 0 -10"
      >
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
        <a-box color="red"></a-box>
      </a-entity>
    )
  }
}

export default Board;