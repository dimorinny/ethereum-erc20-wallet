import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Application from './containers/application';

export default (
    <Route path='/:address' component={ Application }>
    </Route>
);
