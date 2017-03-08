import React from 'react'
import 'aframe';

const Cell = props => {
  let position = props.position
    .split('')
    .map(num=>num*3-3)
    .join(' ')
  let material = props.color ? 
    `color: ${props.color}; transparent: true; opacity: 0.5`:
    `color: white; transparent: true; opacity: 0.3`
  return (
    <a-entity
      geometry="primitive: box; width: 1; height: 1; depth: 1"
      position={position}
      material={material}
      onClick={()=>props.placePiece(props.position)}
    ></a-entity>
  )
}

export default Cell;