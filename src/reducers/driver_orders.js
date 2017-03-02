export default function (state = [], action) {
  switch (action.type) {
    case 'GET_DRIVER_ORDERS_SUCCSS':
      return action.payload;
    default:
      return state;
  }
}
