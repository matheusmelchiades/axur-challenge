import React from 'react';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';

import App from './index'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
