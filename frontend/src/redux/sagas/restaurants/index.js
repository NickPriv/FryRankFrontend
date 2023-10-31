import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';

import { types, restaurantsActions } from '../../reducers/restaurants';
import { BACKEND_SERVICE_PATH } from '../../constants';

const API_PATH = `${BACKEND_SERVICE_PATH}/restaurants`;

export function* callGetRestaurants() {
    try {
        const { data } = yield axios.get(API_PATH);
        yield put(restaurantsActions.successfulGetRestaurantsRequest(data));
    } catch (err) {
        yield put(restaurantsActions.failedGetRestaurantsRequest('Failed getting restaurants'));
    }
}

export function* callGetRestaurantById({ restaurantId }) {
    try {
        const { data } = yield axios.get(API_PATH, { params: { restaurantId } });
        yield put(restaurantsActions.successfulGetRestaurantByIdRequest(data));
    } catch (err) {
        yield put(restaurantsActions.failedGetRestaurantByIdRequest('Failed getting a restaurant for the requested ID'));
    }
}

export default function* watchRestaurantsRequest() {
    yield takeEvery(types.GET_RESTAURANTS_REQUEST, callGetRestaurants);
    yield takeEvery(types.GET_RESTAURANT_BY_ID_REQUEST, callGetRestaurantById);
}