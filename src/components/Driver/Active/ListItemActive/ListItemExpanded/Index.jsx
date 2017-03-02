import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderDetailsList from './OrderDetailsList';
import CustomerDetailsList from './CustomerDetailsList';
import ActionButton from './ActionButton';
import EditOrderButton from './EditOrderButton';
import ConfirmationModal from './ConfirmationModal';
const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

class ListItemExpanded extends Component {
  render() {
    return (
      <section style={listItemExpandedStyle}>
        <ActionButton orderId={this.props.order.orderId} orderStatus={this.props.order.orderStatus} />
        <span style={listHeader}>
        <h1 style={storeName}>{this.props.order.storeName}</h1>
        <span>{this.props.order.orderStatus.toUpperCase()}</span>
        </span>
        <OrderDetailsList order={this.props.order} />
        <span style={listHeader}>
        <h1 style={storeName}>Customer</h1>
        <EditOrderButton order={this.props.order} />
        </span>
        <CustomerDetailsList order={this.props.order} />
        {this.props.order.orderNote ? <h1 style={noteTitle}>Order Note</h1> : null}
        <span style={orderNotes}>{this.props.order.orderNote}</span>
        {this.props.deliveryConfirmation
          ? <ConfirmationModal order={this.props.order} />
          : null}
      </section>
    );
  }
}

const listHeader = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '16px',
  marginBottom: '8px',
};

const noteTitle = {
  fontSize: '16px',
  margin: '0, 16px',
  padding: '0',
};

const storeName = {
  fontSize: '16px',
  margin: '0',
  padding: '0',
}

const listItemExpandedStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  backgroundColor: '#ECEFF1',
};
const orderNotes = {
  width: '100%',
};

function mapStateToProps({ deliveryConfirmation }) {
  return { deliveryConfirmation };
}

export default connect(mapStateToProps, null)(ListItemExpanded);
