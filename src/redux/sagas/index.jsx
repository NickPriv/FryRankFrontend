import { all, fork } from 'redux-saga/effects';
import restaurantsSaga from './restaurants';
import reviewsSaga from './reviews';
import userSettingsSaga from './userSettings'

export default function* rootSaga() {
    yield all([
        fork(reviewsSaga),
        fork(restaurantsSaga),
        fork(userSettingsSaga),
    ]);
}