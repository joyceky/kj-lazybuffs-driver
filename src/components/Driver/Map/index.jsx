import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDriverActiveOrders, getDirections } from '../../../actions';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { divIcon } from 'leaflet';

const Address = ({ address, zip, unit }) => {
  return(
    <span>
      {unit ? `${address} ${unit} ${zip}` : `${address} ${zip}`}
    </span>
  );
}

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;


class DriverMap extends Component {
  constructor(){
    super();
    this.state = {
      lat: null,
      lng: null,
      ordersWithLocation: [],
    };
  }

  componentDidMount() {
    this.props.getDriverActiveOrders(this.props.auth);
    if (this.props.driverActiveOrders.length) {
      this.props.driverActiveOrders.forEach(order => {
        this.getCoords(order);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.driverActiveOrders.length !== this.props.driverActiveOrders.length) {
      nextProps.driverActiveOrders.forEach(order => {
        this.getCoords(order);
      });
    }
  }

  getCoords(order) {
    console.log('getting coord for order: ', order);
    let customerAddress = order.customerAddress.replace(/ +/g,'+');
    let address = `${customerAddress},+Boulder,+CO&`;
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}key=AIzaSyD7r-xG9QqIPcGJyKWuGPJ0_LV-M_ZM9ao`)
    .then(({ data }) => {
      let orderWithLocation = JSON.parse(JSON.stringify(order));
      orderWithLocation.location = data.results[0].geometry.location;
      this.setState({ ordersWithLocation: this.state.ordersWithLocation.concat(orderWithLocation) });
    })
    .catch(err => console.log(err))
  }

  styleAndPlotOrdersWithLocation() {
    return this.state.ordersWithLocation
      .map((order) =>  {
        let className;
        switch (order.orderStatus) {
          case 'unassigned':
            className = 'map-icon-unassigned';
            break;
          case 'assigned':
            className = 'map-icon-assigned';
            break;
          case 'confirmed':
            className = 'map-icon-confirmed';
            break;
          case 'waiting':
            className = 'map-icon-waiting';
            break;
          case 'pickedUp':
            className = 'map-icon-picked-up';
            break;
          default:
        }
        const icon = divIcon({ className });

      return (
        <Marker
        icon={icon}
        key={`marker${order.orderId}`}
        position={order.location}
        >
          <Popup>
            <span>
              <p>
              {order.customerName}
              </p>
              <p>
              {stylePhone(order.customerPhone)}
              </p>
              <p>
              {`${order.customerAddress} ${order.customerUnit ? order.customerUnit : ''}`}
              </p>

            </span>
          </Popup>
        </Marker>
      );
    })
  }

  render(){
    let order = null;
    if (this.props.driverActiveOrders[0]) {
      order = this.props.driverActiveOrders[0]
    };
    return (
      <section style={style.container}>
        <section  style={style.header}>
          <section>
            <h1 style={style.title}>
              {order
                ? 'Get Directions For Next Order'
                : 'No Active Orders'}
            </h1>

            {order
              ? <Address
                  address={order.customerAddress}
                  unit={order.customerUnit}
                  zip={order.customerZip}
                />
              : null}

          </section>
            <button
              // onClick={() => this.getDirections(order)}
              style={actionButton}>
              <i style={actionIcon} className='material-icons'>directions</i>
            </button>
        </section>




        <Map center={[40.0150, -105.2705]} zoom={13} style={style.map}>
          <TileLayer
            url='https://api.mapbox.com/styles/v1/divideyourself/ciw8ag6is001k2pw1xcimgs7n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGl2aWRleW91cnNlbGYiLCJhIjoiY2l2anJ1YnZxMDJsYTJ0cGQxNXM2MXVkaiJ9.GrnyU3h4NMpTax7icuwnZw'
          />
          {this.styleAndPlotOrdersWithLocation()}
        </Map>
      </section>
    );
  }
}
const actionButton = {
  outline: 'none',
};
const actionIcon = {
  fontSize: '50px',
};
const style = {
  map: {
    flex: '8',
    backgroundColor: '',
    zIndex: '0',
  },
  header: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    margin: '0',
    padding: '0',
    paddingBottom: '8px',
  },
  list: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
  container: {
    position: 'fixed',
    top: '50px',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100% - 50px)',
    overflow: 'scroll',
  },
};

function mapStateToProps({ auth, driverActiveOrders }) {
  return { auth, driverActiveOrders };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDriverActiveOrders, getDirections }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverMap);
