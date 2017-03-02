import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmOrder, waitOnOrder, pickUpOrder, showDeliveryConfirmation } from '../../../../../actions';

class CompleteOrderButton extends Component {
  constructor(){
    super();
    this.state = {
      orderConfirmationActive: false,
      orderConfirmed: false,
      orderTip: '',
    }
  }

  handleNextAction(status) {
    if (status === 'assigned') {
      return this.props.confirmOrder(this.props.orderId, this.props.auth);
    }
    else if (status === 'confirmed') {
      return this.props.waitOnOrder(this.props.orderId, this.props.auth);
    }
    else if (status === 'waiting') {
      return this.props.pickUpOrder(this.props.orderId, this.props.auth)
    }
    else if (status === 'pickedUp') {
      return this.props.showDeliveryConfirmation(this.props.orderId);
    }
  }

  render() {
    let title = null;
    switch (this.props.orderStatus) {
       case 'assigned':
         title = 'Confirm';
         break;
       case 'confirmed':
         title = 'Waiting';
         break;
       case 'waiting':
         title = 'Picked Up';
         break;
       case 'pickedUp':
         title = 'Confirm Delivery';
         break;
       default:
     }
    return (
      <button
        style={buttonStyle}
        onClick={() => this.handleNextAction(this.props.orderStatus)}
      >
      {title}

      </button>
    );
  }
}
const buttonStyle = {
  backgroundColor: '#009688',
  padding: '0',
  borderRadius: '4px',
  color: 'white',
  width: '100%',
  fontSize: '16px',
  padding: '8px',
};

function mapStateToProps({ auth }) {
    return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ confirmOrder, waitOnOrder, pickUpOrder, showDeliveryConfirmation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrderButton);
