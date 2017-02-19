/**
 * Created by brook on 2017/1/24.
 */
import { fork, takeLatest } from 'redux-saga/effects';

export default function wrapperFork(type, serFunc) {
  return fork(function* () {
    yield takeLatest(type, serFunc);
  });
}
