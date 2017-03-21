import React from 'react';
import { render } from 'react-dom';
import assign from 'object-assign';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

// reduxers & sagas
import rootReducer, { rootSaga } from './components';
// main component
import RootView from './components/rootView';

// reducers
const reducersWithRouter = combineReducers(
  assign({
    routing: routerReducer,
  }, rootReducer),
);

// middlewares
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducersWithRouter,
  compose(
    applyMiddleware(
      routerMiddleware(hashHistory),
      sagaMiddleware,
    ),
    (window.devToolsExtension && window.devToolsExtension()) || (f => f),
  ),
);

const history = syncHistoryWithStore(hashHistory, store);
sagaMiddleware.run(rootSaga);


render(
  <Provider store={store}>
    <RootView history={history} />
  </Provider>,
  document.getElementById('container'),
);
