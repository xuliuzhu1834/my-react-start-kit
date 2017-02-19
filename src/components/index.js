/**
 * Created by brook on 2016/12/27.
 */
import assign from 'object-assign';
import { put, fork, call, takeEvery } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';

const reducerReq = require.context('./', true, /reducer\.js$/);
const saga = require.context('./', true, /saga\.js$/);

let currentLocation = '/';

function recordPath(action) {
  currentLocation = action.payload.pathname;
}

export default reducerReq.keys().reduce((acc, key) => assign({
  [key.slice(2, -('/reducer.js'.length))]: reducerReq(key).default,
}, acc), {});

export function* rootSaga() {
  /* eslint func-names: 0 */
  yield fork(function* () {
    yield takeEvery(LOCATION_CHANGE, recordPath);
  });
  yield saga
    .keys()
    .map(key => saga(key).default)
    .map(singleSaga => fork(function* () {
      /* eslint no-constant-condition: 0 */
      while (10) {
        try {
          yield call(singleSaga);
        } catch (e) {
          /* eslint no-console: 0 */
          console.log(e);
          if (e.loginNeeded) {
            yield put(push(`/login/${encodeURIComponent(currentLocation)}`));
          }
        }
      }
    }));
}
