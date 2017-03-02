import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdate } from '../../../../../actions';
import MaterialInput from '../../../../Material/MaterialInput';
class UpdateCustomerDetailsList extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      customerName: this.props.order.customerName,
      customerPhone: this.props.order.customerPhone,
      customerAddress: this.props.order.customerAddress,
      customerUnit: this.props.order.customerUnit,
      customerZip: this.props.order.customerZip,
    };
  }
  render(){
    console.log('attempting to mount <UpdateCustomerDetailsList />');
    console.log(this.props);
    return (
      <ul style={style.list}>
        <li style={style.listItem}>
        <span style={style.listItemContainer}>
          <span>Customer Name</span>
          <input state={this.state.customerName} />
        </span>
        </li>
        <li style={style.listItem}>
        <span style={style.listItemContainer}>
          <span>Customer Address</span>
          <input state={this.state.customerAddress} />
        </span>
        </li>
        <li style={style.listItem}>
        <span style={style.listItemContainer}>
          <span>Customer Unit</span>
          <input state={this.state.customerUnit} />
        </span>
        </li>
        <li style={style.listItem}>
        <span style={style.listItemContainer}>
          <span>Customer Phone</span>
          <input state={this.state.customerPhone} />
        </span>
        </li>
        <li style={style.listItem}>
        <span style={style.listItemContainer}>
          <span>Customer Zip</span>
          <input state={this.state.customerZip} />
        </span>
        </li>
      </ul>
    );
  }
};

const style = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    width: '100%',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
};

const listItem = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

function mapStateToProps({ auth }) {
  return { auth };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUpdate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerDetailsList);
