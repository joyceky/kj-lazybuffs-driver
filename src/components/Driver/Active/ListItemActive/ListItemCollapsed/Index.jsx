import React from 'react';
import Address from './Address';
import Store from './Store';
import Minutes from './Minutes';
import ToggleButton from './ToggleButton';

const ListItemCollapsed = ({ order }) => {
  return (
    <section style={collapsedStyle}>
        <ToggleButton orderId={order.orderId} />
        <section style={collapsedRow}>
          <span>{order.storeName}</span>
          <span>Order Id: {order.orderId}</span>
        </section>
        {/* <Address address={order.customerAddress} unit={order.customerUnit} /> */}
        <span style={orderStatusStyle}>{order.orderStatus}</span>
        <Minutes createdAt={order.orderCreatedAt} readyIn={order.orderReadyIn} />

    </section>
  );
};

const collapsedRow = {
  display: 'flex',
  flexDirection: 'column',
};

const collapsedStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '50px',
  padding: '8px',
  boxSizing: 'border-box',
};

const orderStatusStyle = {
  fontSize: '1em',
};
// const storeAddressStyle = {
//   height: '50px',
//   display: 'flex',
//   flexDirection: 'column',
//   paddingRight: '20px',
// };

ListItemCollapsed.propTypes = {
  order: React.PropTypes.object.isRequired,
}

export default ListItemCollapsed;
