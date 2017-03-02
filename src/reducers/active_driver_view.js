export default function(state = 'list', action){
  switch (action.type) {
    case 'SET_ACTIVE_DRIVER_VIEW':
      return action.payload;
    default:
      return state;
  }
}
