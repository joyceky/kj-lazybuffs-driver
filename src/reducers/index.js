import { combineReducers } from 'redux';
import auth from './auth';
import confirmation from './confirmation';
import errors from './errors';
import loading from './loading';
import loginFormActive from './login_form_active';
import newOrderFormActive from './new_order_form_active';
import activeListItem from './toggle_active_list_item';
import activeOrderUpdateId from './toggle_order_update';

import activeDriverView from './active_driver_view';

import saveUpdatedOrderId from './save_updated_order';
import saveUpdatedState from './save_updated_state';

import driverOrders from './driver_orders';
import driverActiveOrders from './driver_active_orders';
import driverCompletedOrders from './driver_completed_orders';
import deliveryConfirmation from './delivery_confirmation';

const rootReducer = combineReducers({
  errors,
  activeDriverView,
  activeListItem,
  activeOrderUpdateId,
  auth,
  confirmation,
  deliveryConfirmation,
  driverActiveOrders,
  driverCompletedOrders,
  driverOrders,
  loading,
  loginFormActive,
  newOrderFormActive,
  saveUpdatedOrderId,
  saveUpdatedState,
});
export default rootReducer;
