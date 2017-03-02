import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearOrderConfirm, completeOrder } from '../../../../../actions';
import MaterialInput from '../../../../Material/MaterialInput';

class ConfirmationModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      tip: parseFloat(this.props.order.orderTip),
    };
    this.handleTipConfirm = this.handleTipConfirm.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
  }
  handleTipConfirm(e) {
    this.setState({ tip: e.target.value });
  }

  completeOrder() {
    let newOrder = JSON.parse(JSON.stringify(this.props.order));
    newOrder.orderTip = this.state.tip;
    this.props.completeOrder(newOrder, this.props.auth);
  }

  render() {
    return (
      <section style={confirmationModal}>
        <section style={confirmationCard}>
          <section>
            <h1 style={{fontSize: '24px'}}>Confirm Tip</h1>
            <MaterialInput
            onChange={this.handleTipConfirm}
            value={this.state.tip}
            label='Tip'
            type='integer'
            />
          </section>
          <section style={buttonContainer}>
            <button
              style={confirmButton}
              onClick={this.completeOrder}
            >
              Complete
            </button>
            <button
              style={cancelButton}
              onClick={this.props.clearOrderConfirm}
            >
              Cancel
            </button>
          </section>
        </section>
      </section>
    );
  }
}
const buttonContainer = {
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
};

const confirmButton = {
  borderRadius: '4px',
  fontSize: '28px',
  padding: '8px',
  color: 'rgb(0, 150, 136)',
};

const cancelButton = {
  borderRadius: '4px',
  fontSize: '28px',
  padding: '8px',
  color: 'rgba(0,0,0,0.3)',
};

const confirmationCard = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '80vh',
  width: '80vw',
  backgroundColor: 'white',
  padding: '32px',
};

const confirmationModal = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  top: '0',
  left: '0',
  backgroundColor: 'rgba(0,0,0,0.5)',
};

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearOrderConfirm, completeOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
