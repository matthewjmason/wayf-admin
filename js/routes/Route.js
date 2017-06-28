import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/AppContainer';
import DeviceHeaderContainer from '../components/DeviceHeaderContainer'

export default (
    <Route path='/' component={AppContainer} queries={ViewerQuery}>

        <Redirect from='*' to='/' />
    </Route>
);