import React from 'react';
import EditOrderButton from './EditOrderButton';
import ActionButton from './ActionButton';

const ButtonPanel = ({ type, order }) => {
  if (type === 'Customer') {
    return (
      <section style={panelStyle}>
      </section>
    );
  }
  else {
    return (
      <section style={panelStyle}>
        <ActionButton orderId={order.orderId} orderStatus={order.orderStatus} />
        <EditOrderButton order={order} />
      </section>
    );
  }
};

const panelStyle = {
};

ButtonPanel.propTypes = {
  type: React.PropTypes.string.isRequired,
  // order: React.PropTypes.obj.isRequired,
}

export default ButtonPanel;
