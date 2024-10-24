import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';

import { types, restaurantsActions } from '../../reducers/restaurants';
import {AGGREGATE_INFORMATION_API_PATH} from "../../../constants";

const GOOGLE_API_PATH = "https://places.googleapis.com/v1/";
const HEADER_CONTENT_TYPE = 'Content-Type';
const HEADER_API_KEY = 'X-Goog-Api-Key';
const HEADER_FIELD_MASK = 'X-Goog-FieldMask';

export function* callGetRestaurantsForQuery({ textQuery, location }) {
    const locationBias = location ?
        {
            "circle": {
                "center": {
                    "latitude": location.latitude,
                    "longitude": location.longitude
                },
                "radius": 500.0
            }
        } : null;

    try {
        const { data } = yield axios.post(GOOGLE_API_PATH + "places:searchText",
            {
                'textQuery': textQuery,
                'locationBias': locationBias,
                'maxResultCount': 10,
                'includedType': 'restaurant'
            },
            { headers: {
                [HEADER_CONTENT_TYPE]: 'application/json',
                [HEADER_API_KEY]: process.env.REACT_APP_GOOGLE_API_KEY,
                [HEADER_FIELD_MASK]: 'places.displayName,places.formattedAddress,places.id,places.location'
            }}
        );
        console.log("here2");

        const aggregateReviewsData = data && data.places
            ? yield axios.get(AGGREGATE_INFORMATION_API_PATH, { params: { ids: (data.places.map(place => place.id).join()), rating: true } })
            : null;

        yield put(restaurantsActions.successfulGetRestaurantsForQueryRequest(data, aggregateReviewsData?.data.restaurantIdToRestaurantInformation));
    } catch (err) {
        yield put(restaurantsActions.failedGetRestaurantsForQueryRequest(err.response.data.error.message));
    }
}

export function* callGetRestaurantsForIds({ restaurantIds }) {
    try {
        let restaurantIdToDetailsMap = new Map();

        for (const restaurantId of restaurantIds) {
            const { data } = yield axios.get(GOOGLE_API_PATH + "places/" + restaurantId,
                { headers: {
                    [HEADER_CONTENT_TYPE]: 'application/json',
                    [HEADER_API_KEY]: process.env.REACT_APP_GOOGLE_API_KEY,
                    [HEADER_FIELD_MASK]: 'id,displayName,formattedAddress'
                }}
            );

            restaurantIdToDetailsMap.set(restaurantId, data);
        }

        yield put(restaurantsActions.successfulGetRestaurantsForIdsRequest(restaurantIdToDetailsMap));
    } catch (err) {
        yield put(restaurantsActions.failedGetRestaurantsForIdsRequest(err.response.data.error.message));
    }
}

export default function* watchRestaurantsRequest() {
    yield takeEvery(types.GET_RESTAURANTS_FOR_QUERY_REQUEST, callGetRestaurantsForQuery);
    yield takeEvery(types.GET_RESTAURANTS_FOR_IDS_REQUEST, callGetRestaurantsForIds);
}