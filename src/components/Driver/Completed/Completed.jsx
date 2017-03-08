import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItemCompleted from './ListItemCompleted';
import BarChartComponent from './Graphs/BarChart';
import axios from 'axios';
import { API_URL } from '../../../actions';

class CompletedOrders extends Component {
  constructor() {
    super();

    const today = new Date(Date.now());
    const adjustedToday = today.getTimezoneOffset();

    this.state = {
      orders: [],
      month: today.getMonth(),
      year: today.getFullYear(),
      loading: false,
      showInvoice: false
    };

    this.getOrderData = this.getOrderData.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectYear = this.selectYear.bind(this);
    // this.onOrderTypeChange = this.onOrderTypeChange.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    this.getOrderData(this.state.month, this.state.year);
  }

  getOrderData(month, year) {
    this.setState({ loading: true });

      console.log(`${API_URL}/driver/orders/completed/month`, { auth: this.props.auth, month, year});
      axios.post(`${API_URL}/driver/orders/completed/month`, { auth: this.props.auth, month, year })
        .then(({ data }) => {
          this.setState({ orders: data, month, loading: false, shouldChartsBeVisible: true });
        })
        .catch((err) => {
          console.log("Error: ", err);
          this.setState({ loading: false });
        })
      }

  formatData(orders) {
      let month = parseInt(this.state.month)+1;
      const daysNum = new Date(this.state.year, month, 0).getDate();
      const days = [];

      for (var i = 1; i <= daysNum; i++) { days.push(i) };

      const cleanData = days.map((day) => {
        const daysOrders = orders.filter((order) => {
          if ( new Date(parseInt(order.orderCreatedAt) + 420).getDate() === day) return true;
        });
        const total = daysOrders.reduce((curr, nextOrder) => {
           return curr + parseFloat(nextOrder.orderSubTotal) ;
        }, 0);

        return { date: day, total, orders: daysOrders.length };
      });

      return cleanData;
    }

  selectMonth(event) {
    let month = event.target.value;
    this.setState({ month });
    this.getOrderData(month, this.state.year);
  }

  selectYear(event){
    let year = event.target.value;
    this.setState({ year });
    this.getOrderData(this.state.month, year);
  }

  // onOrderTypeChange(event) {
  //   let orderType = event.target.value;
  // }

  calcRevenue(orders){
      return orders
      .reduce((curr, nextOrder) => {
        let sub = (parseFloat(curr) + parseFloat(nextOrder.orderTip)).toFixed(2);
        return parseFloat(sub) || 0.00;
      }, 0);
  }

  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <section style={style.container}>

           <section style={style.header}>
             <section style={style.buttonContainer}>
                 <select style={style.select} onChange={this.selectMonth} value={this.state.month}>
                   {
                      months.map((monthVal, i) => {
                        return <option value={i} key={i}>{monthVal}</option>
                      })
                    }
                  </select>

                  <select style={style.select} onChange={this.selectYear} value={this.state.year}>
                    {
                      [2014,2015,2016,2017]
                      .map((year, i) => {
                        return <option key={i} value={year}>{year}</option>
                      })
                    }
                  </select>
              </section>

              <section style={style.overviewContainer}>
                <p style={{padding: '10px'}}>{`Orders: ${ this.state.orders.length }`}</p>

                <p style={{padding: '10px'}}>{` Revenue: $${ (this.calcRevenue(this.state.orders)) }`}</p>
              </section>
            </section>

          { this.state.loading ?
            <span style={style.subContainer}>
              <h1 style={style.title}>Loading analytics...</h1>
            </span>
            : null }

          { !this.state.loading && this.state.orders.length === 0 ?
            <span style={style.subContainer}>
              <h1 style={style.title}>No Completed Orders For This Period</h1>
            </span> : null }

          { !this.state.loading && this.state.orders.length > 0
            ?
            <div>
              <section style={style.chartContainer}>
                <div style={{zIndex: '0'}}>
                  <p>Order Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="orders" color="#CFB87C" />

                  <p>Revenue Analytics</p>
                  <BarChartComponent orders={this.formatData(this.state.orders)} dataKey="total" color="#A2A4A3" />
                </div>
              </section>
            </div>
            : null }

            <ul style={style.listStyle}>
              {this.state.orders.map((order) => {
                return  <ListItemCompleted order={order} key={order.orderId} />
              })}
            </ul>
          </section>
    );
  }
}

const style = {
  container: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  subContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: '5px',
    display: 'block',
    padding: '8px 10px',
    fontSize: '22px',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: 'black',
    boxShadow: '0px 5px 0px 0px #565A5C',
    fontSize: '18px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  overviewContainer: {
    display: 'flex',
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '20px',
    margin: '16px',
    padding: '0',
  },
  select: {
    height: '35px',
    fontSize: '18px',
    margin: '8px',
    backgroundColor: '#fff',
    color: "#565A5C"
  },
  header: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '18px',
  },
  chartContainer: {
    maxWidth: '100%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 'auto',
    width: 'auto',
    fontSize: '20px',
    textAlign: 'center'
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(CompletedOrders);
