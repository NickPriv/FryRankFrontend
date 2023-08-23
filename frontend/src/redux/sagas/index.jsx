import { all, fork } from 'redux-saga/effects';
import reviewsSaga from './reviews';

export default function* rootSaga() {
    yield all([
        fork(reviewsSaga),
    ]);
}