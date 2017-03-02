import React, { Component } from 'react';
import ListItemCompleted from './ListItemCompleted';
import BarChartComponent from './Graphs/BarChart';

import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../actions';


class Completed extends Component {
  constructor() {
    super();

    let today = new Date(Date.now());

    this.state = {
      orders: [],
      month: today.getMonth()
    };

    this.getOrdersForMonth = this.getOrdersForMonth.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {

    this.getOrdersForMonth(this.state.month);
  }

  getOrdersForMonth(month) {

    axios.post(`${API_URL}/driver/orders/completed/month`, { auth: this.props.auth, month })
    .then(({ data }) => {
      this.setState({ orders: data, month: parseInt(month) });
    })
  }

  formatData(orders) {
    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    const cleanData = days.map((day) => {
      const daysOrders = orders.filter((order) => {
        if ( new Date(parseInt(order.orderCreatedAt)).getDate() === day) return true;
      });

      const total = daysOrders.reduce((curr, nextOrder) => {
        return curr + parseFloat(nextOrder.orderSubTotal);
      }, 0);

      const tips = daysOrders.reduce((curr, nextOrder) => {
        return curr + parseFloat(nextOrder.orderTip);
      }, 0);

      return { date: day, total, tips, orders: daysOrders.length };
    });

    return cleanData;
  }

  onMonthChange(event) {
    // console.log("event target val", event.target.value);
    this.getOrdersForMonth(event.target.value);
  }

  render() {
    return (
      <section>

        {this.state.orders.length === 0 ? <h1>No Completed Orders</h1> : null}

        {/* Charts go here */}
{/*
        <button style={styles.buttonStyle}> Generate Reports </button> */}
        {console.log("logging in render", this.state.month)}
        <select onChange={this.onMonthChange} value={this.state.month}>
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>

        <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#7830ee" />

        <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="tips" color="#3cd54f"/>

        <ul>
          {this.state.orders.map(order => <ListItemCompleted order={order} key={order.orderId} />)}
        </ul>

      </section>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: '#817c7e',
    border: '1px #403e40 solid',
    margin: '10'
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Completed);
