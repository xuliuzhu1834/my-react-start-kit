import React from 'react';
import { Router } from 'react-router';
import route from './route';

const RootView = ({
  history,
}) => (
  <Router history={history} routes={route} />
);

RootView.propTypes = {
  history: React.PropTypes.shape({}),
};

export default RootView;
