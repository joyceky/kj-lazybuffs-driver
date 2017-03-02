import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getDriverActiveOrders, getDriverCompletedOrders } from '../../actions';
import Nav from './Nav';

class Driver extends Component {
  componentDidMount() {
    if (!this.props.auth) return browserHistory.push('/login');
    this.props.getDriverActiveOrders(this.props.auth);
    this.props.getDriverCompletedOrders(this.props.auth);
  }

  render() {
    return (
      <main>
        <Nav />
        <section style={style.container}>
          {this.props.children}
        </section>
      </main>
    );
  }
}

const style = {
  container: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
};

function mapStateToProps({ auth, driverActiveOrders, driverCompletedOrders }){
  return { auth, driverActiveOrders, driverCompletedOrders };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDriverActiveOrders, getDriverCompletedOrders }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
