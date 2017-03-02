import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateCustomerDetailsList from './UpdateCustomerDetailsList';

const stylePhone = (num) => {
  return <a href={`tel:+1-${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`}>{`${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`}</a>
}

const Address = ({ address, unit }) => {
  return unit ? <span>{address} {unit}</span> : <span>{address}</span>;
}
const gmapsAddress = (address, unit) => {
  return unit ? `${address.replace(/ +/g,'+')}+${unit.replace(/ +/g,'+')}+Boulder+CO` : `${address.replace(/ +/g,'+')}+Boulder+CO`;
}

class CustomerDetailsList extends Component {
  render(){
    const match = this.props.activeOrderUpdateId === this.props.order.orderId;
    if (match) return <UpdateCustomerDetailsList order={this.props.order} />;
    return (
      <ul style={{listStyle: 'none', margin: '0', padding: '0' }}>
        <li style={{fontSize: '16px'}}>
          {this.props.order.customerName}
        </li>
        <li style={{fontSize: '16px'}}>
          <Address address={this.props.order.customerAddress} unit={this.props.order.customerUnit} />
        </li>
        <li style={{fontSize: '16px'}}>
          {stylePhone(this.props.order.customerPhone)}
        </li>
        <li>
          <a href={`http://maps.google.com/maps?q=${gmapsAddress(this.props.order.customerAddress,this.props.order.customerUnit)}`}>View in google maps</a>
        </li>
      </ul>
    );

  }
};

function mapStateToProps({ activeOrderUpdateId }) {
  return { activeOrderUpdateId };
}

export default connect(mapStateToProps, null)(CustomerDetailsList);
