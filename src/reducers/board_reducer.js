import * as actions from '../actions/actiontypes';

const defaultState = () => {
  let cells = {};
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        cells[''+i+j+k] = null
      }
    }
  }
  return cells;
}


export default (state=defaultState(), action) => {
  switch (action.type) {
    case 'PLACE_PIECE':
      return ({...state, cells:action.board});
    default:
      return state;
  }
}