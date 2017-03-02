export default function (state = [], action) {
  switch (action.type) {
    case 'GET_DRIVER_COMPLETED_ORDERS_SUCCESS':
      return action.payload;
    case 'GET_DRIVER_COMPLETED_ORDERS_SORT_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
