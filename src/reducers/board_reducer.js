import * as actions from '../actions/actiontypes';

const defaultState = () => {
  let cells = {};
  let turn = Math.round(Math.random()) ? 'red' : 'yellow'
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        cells[''+i+j+k] = null
      }
    }
  }
  return {cells, turn};
}


export default (state=defaultState(), action) => {
  switch (action.type) {
    case 'PLACE_PIECE':
      console.log(state)
      return ({...state, 
        cells: action.cells,
        turn: state.turn === 'red' ? 'yellow' : 'red'  
      });
    default:
      return state;
  }
}