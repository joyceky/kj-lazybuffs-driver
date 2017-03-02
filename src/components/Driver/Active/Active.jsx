import React, { Component } from 'react';
import ListItemActive from './ListItemActive';
import { connect } from 'react-redux';

class Active extends Component {

  mapListItems(orders) {
    return (
      <ul>
        {orders.map((order) => {
          <ListItemActive order={order} key={order.orderId} />
        })}
      </ul>
    );
  }

  render() {
      return (
        this.props.driverActiveOrders[0]
        ? this.mapListItems(this.props.driverActiveOrders)
        : <h1>No Active Orders</h1>
      )
  }
}

function mapStateToProps({ driverActiveOrders }) {
  return { driverActiveOrders };
}

export default connect(mapStateToProps, null)(Active);
