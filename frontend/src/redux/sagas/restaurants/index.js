import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';

import { types, restaurantsActions } from '../../reducers/restaurants';
import { GOOGLE_API_PATH } from '../../constants';
import { API_KEY } from '../../../properties'

const HEADER_CONTENT_TYPE = 'Content-Type';
const HEADER_API_KEY = 'X-Goog-Api-Key';
const HEADER_FIELD_MASK = 'X-Goog-FieldMask';

export function* callGetRestaurants({ textQuery }) {
    try {
        const { data } = yield axios.post(GOOGLE_API_PATH + "places:searchText",
            { 'textQuery': textQuery },
            { headers: {
                [HEADER_CONTENT_TYPE]: 'application/json',
                [HEADER_API_KEY]: API_KEY,
                [HEADER_FIELD_MASK]: 'places.displayName,places.formattedAddress,places.id'
            }}
        );
        yield put(restaurantsActions.successfulGetRestaurantsRequest(data));
    } catch (err) {
        yield put(restaurantsActions.failedGetRestaurantsRequest('Failed getting restaurants from Google'));
    }
}

export function* callGetRestaurantById({ restaurantId }) {
    try {
        const { data } = yield axios.get(GOOGLE_API_PATH + "places/" + restaurantId,
            { headers: {
                [HEADER_CONTENT_TYPE]: 'application/json',
                [HEADER_API_KEY]: API_KEY,
                [HEADER_FIELD_MASK]: 'id,displayName,formattedAddress'
            }}
        );
        yield put(restaurantsActions.successfulGetRestaurantByIdRequest(data));
    } catch (err) {
        yield put(restaurantsActions.failedGetRestaurantByIdRequest('Failed getting restaurant details from Google'));
    }

}

export default function* watchRestaurantsRequest() {
    yield takeEvery(types.GET_RESTAURANTS_REQUEST, callGetRestaurants);
    yield takeEvery(types.GET_RESTAURANT_BY_ID_REQUEST, callGetRestaurantById);
}