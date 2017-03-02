import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveUpdate } from '../../../../../actions';
class UpdateOrderDetailsList extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      subTotal: this.props.order.orderSubTotal,
      tax: this.props.order.orderTax,
      fee: this.props.order.orderFee,
      tip: this.props.order.orderTip,
      total: this.props.order.orderTotal,
      paymentType: this.props.order.orderPaymentType,
      ageRestricted: this.props.order.orderAgeRestricted,
    };
  }
  render(){
    const order = this.props.order;
    return (
      <ul style={style.list}>
      <li style={listItem}>
      <span style={style.totals}>SubTotal:</span>
      <input style={style.totals} value={this.state.subTotal} />
      </li>
      <li style={listItem}>
      <span style={style.totals}>Tax:</span>
      <input style={style.totals} value={this.state.tax} />
      </li>
      <li style={listItem}>
        <span style={style.totals}>Fee:</span>
        <input style={style.totals} value={this.state.fee} />
      </li>
      <li style={listItem}>
      <span style={style.totals}>Tip:</span>
      <input style={style.totals} value={this.state.tip} />
      </li>
      <li style={listItem}>
      <span style={style.totals}>Total:</span>
      <input style={style.totals} value={this.state.total} />
      </li>
      <li style={listItem}>
      <span style={style.totals}>Payment Type:</span>
      <span style={style.totals}>{this.state.paymentType}</span>
      </li>
      <li style={listItem}>
      <span style={style.totals}>Age Restricted?</span>
      <span style={style.totals}>{this.state.ageRestricted ? this.state.ageRestricted : 'no'}</span>
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
    width: '280px',
  },
  storeName: {
    fontSize: '20px',
  },
  totals: {
    fontSize: '16px',
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderDetailsList);
