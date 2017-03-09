import React, { Component } from 'react';
import ListItemActive from './ListItemActive';
import { connect } from 'react-redux';

class Active extends Component {

  mapListItems(orders) {
    return (
      <ul style={{ listStyle: 'none', width: '100%', padding: '0' }}>
        {orders.map((order) => {
          return <ListItemActive order={order} key={order.orderId} />
        })}
      </ul>
    );
  }

  render() {
    console.log(this.props.driverActiveOrders);
      return (
        this.props.driverActiveOrders.length > 0
        ? this.mapListItems(this.props.driverActiveOrders)
        : <h1>No Active Orders</h1>
      )
  }
}

function mapStateToProps({ driverActiveOrders }) {
  return { driverActiveOrders };
}

export default connect(mapStateToProps, null)(Active);
