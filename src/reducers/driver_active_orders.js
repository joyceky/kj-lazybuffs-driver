export default function (state = [], action) {
  switch (action.type) {
    case 'GET_DRIVER_ACTIVE_ORDERS_SUCCESS':
      return action.payload;
    case 'LEAVE_STORE_SUCCESS':
      return state
      .filter(order => {
        if (order.orderId === action.payload) {
          if (order.orderStatus === 'onRoute') return false;
          else return true;
        }
        else return true;
      })
      .map(order => {
        if (order.orderId === action.payload) {
          if (order.orderStatus === 'assigned') order.orderStatus = 'arrived';
          else if (order.orderStatus === 'arrived') order.orderStatus = 'onRoute';
          return order;
        }
        else return order;
      });
    case 'ARRIVE_AT_STORE_SUCCESS':
      return state
      .filter(order => {
        if (order.orderId === action.payload) {
          if (order.orderStatus === 'onRoute') return false;
          else return true;
        }
        else return true;
      })
      .map(order => {
        if (order.orderId === action.payload) {
          if (order.orderStatus === 'assigned') order.orderStatus = 'arrived';
          else if (order.orderStatus === 'arrived') order.orderStatus = 'onRoute';
          return order;
        }
        else return order;
      });
    default:
      return state;
  }
}
