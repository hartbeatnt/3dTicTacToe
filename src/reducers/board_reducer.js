import * as actions from '../actions/actiontypes';

const defaultState = () => {
  let cells = [];
  for (let i = 0; i < 3; i++) {
    cells[i]=[]
    for (let j = 0; j < 3; j++) {
      cells[i].push([])
      for (let k = 0; k < 3; k++) {
        cells[i][j].push(null)
      }
    }
  }
  return cells;
}


export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.PLACE_PIECE:
      return ({...state, cells:action.cells});
    default:
      return state;
  }
}