import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveDriverView } from '../../actions';
import { Link } from 'react-router';

const NavButton = ({ iconName, to }) => {
  return (
    <button>
      <Link
        to={to}
        style={style.button}
        activeStyle={style.buttonActive}
      >
        <i className="material-icons" style={style.buttonIcon}>{iconName}</i>
      </Link>
    </button>
  );
};

class DriverNav extends Component {
  render() {
    return (
      <nav style={navStyle}>
          <NavButton
            iconName='list'
            to='/active'
          />

          <NavButton
            iconName='playlist_add_check'
            to='/completed'
          />

          <NavButton
            iconName='directions'
            to='/map'
          />
      </nav>
    );
  }
}

const navStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: '#000000',
  width: '100vw',
  height: '50px',
  top: '0',
  left: '0',
}

const style = {
  button: {
    height: '50px',
    width: '25%',
    outline: 'none',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    padding: '0',
  },
  buttonActive: {
    height: '50px',
    width: '25%',
    outline: 'none',
    color: 'rgb(255, 179, 0)',
  },
  buttonIcon: {
    fontSize: '36px',
  },
};

DriverNav.defaultProps = {
};

function mapStateToProps({ auth, activeDriverView }) {
  return { auth, activeDriverView };
}

function mapDriverToProps(dispatch) {
  return bindActionCreators({ setActiveDriverView }, dispatch);
}

export default connect(mapStateToProps, mapDriverToProps)(DriverNav);
