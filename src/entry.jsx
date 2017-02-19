import React from 'react';
import { render } from 'react-dom';
import assign from 'object-assign';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { asyncMiddleware } from 'redux-amrc';

// reduxers & sagas
import rootReducer, { rootSaga } from './components';
// main component
import RootView from './components/rootView';

// 优化React在桌面浏览器下click事件
injectTapEventPlugin();

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
      asyncMiddleware,
    ),
    applyMiddleware(sagaMiddleware),
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
