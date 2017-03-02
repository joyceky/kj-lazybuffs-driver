import React from 'react';
import { Route, browserHistory } from 'react-router';
import Driver from './components/Driver';
import Login from './components/Login';
import Map from './components/Driver/Map';
import Completed from './components/Driver/Completed/Completed';
import Active from './components/Driver/Active/Active';

export default (
  <Route history={browserHistory}>
    <Route path="/" component={Driver}>
      <Route path='active' component={Active} />
      <Route path='completed' component={Completed} />
      <Route path='Map' component={Map} />
    </Route>
    <Route path="login" component={Login} />
  </Route>
);
