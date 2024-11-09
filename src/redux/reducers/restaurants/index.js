import { SELECTED_VIEW } from '../../../constants';
import { getPinData } from './helpers';

export const types = {
    GET_RESTAURANTS_FOR_QUERY_REQUEST: "GET_RESTAURANTS_FOR_QUERY_REQUEST",
    GET_RESTAURANTS_FOR_QUERY_SUCCESS: "GET_RESTAURANTS_FOR_QUERY_SUCCESS",
    GET_RESTAURANTS_FOR_QUERY_FAILURE: "GET_RESTAURANTS_FOR_QUERY_FAILURE",
    GET_RESTAURANTS_FOR_IDS_REQUEST: "GET_RESTAURANTS_FOR_IDS_REQUEST",
    GET_RESTAURANTS_FOR_IDS_SUCCESS: "GET_RESTAURANTS_FOR_IDS_SUCCESS",
    GET_RESTAURANTS_FOR_IDS_FAILURE: "GET_RESTAURANTS_FOR_IDS_FAILURE",
    UPDATE_CURRENT_SEARCH_QUERY: "UPDATE_CURRENT_SEARCH_QUERY",
    SET_LOCATION: "SET_LOCATION",
    SET_SELECTED_VIEW: "SET_SELECTED_VIEW",
    SET_SHOW_INFO_WINDOW: "SET_SHOW_INFO_WINDOW",
    SET_INFO_WINDOW_PROPS: "SET_INFO_WINDOW_PROPS",
    SET_SHOW_MAP_SEARCH_BUTTON: "SET_SHOW_MAP_SEARCH_BUTTON",
}

export const initialState = {
  currentRestaurants: null,
  restaurantIdsForQuery: null,
  error: '',
  requestingRestaurantDetails: false,
  requestingRestaurantsForQuery: false,
  searchQuery: '',
  location: null,
  aggregateReviewsData: null,
  selectedView: SELECTED_VIEW.MAP,
  showInfoWindow: false,
  infoWindowProps: null,
  pinData: null,
  showMapSearchButton: false,
  shouldAdjustBounds: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_RESTAURANTS_FOR_QUERY_REQUEST: {
            return {
                ...state,
                requestingRestaurantsForQuery: true,
            };
        }

        case types.GET_RESTAURANTS_FOR_QUERY_SUCCESS: {

            const queriedRestaurantsMap = new Map();
            action.data.places?.forEach(place => queriedRestaurantsMap.set(place.id, place));

            const newCurrentRestaurants = state.currentRestaurants ? new Map([...state.currentRestaurants, ...queriedRestaurantsMap]) : queriedRestaurantsMap;
            const newRestaurantIdsForQuery = action.data.places ? action.data.places.map(place => place.id) : [];

            return {
                ...state,
                currentRestaurants: newCurrentRestaurants,
                restaurantIdsForQuery: newRestaurantIdsForQuery,
                aggregateReviewsData: action.aggregateReviewsData,
                pinData: getPinData(newRestaurantIdsForQuery, newCurrentRestaurants, action.aggregateReviewsData),
                showInfoWindow: false,
                requestingRestaurantsForQuery: false,
                shouldAdjustBounds: true,
                error: ''
            };
        }

        case types.GET_RESTAURANTS_FOR_QUERY_FAILURE: {
            return {
                ...state,
                requestingRestaurantsForQuery: false,
                error: action.error,
            }
        }

        case types.SET_LOCATION: {
            return {
                ...state,
                location: action.data
            };
        }

        case types.SET_SELECTED_VIEW: {
            return {
                ...state,
                selectedView: action.data,
                shouldAdjustBounds: action.data === SELECTED_VIEW.MAP
            }
        }

        case types.UPDATE_CURRENT_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: action.data,
                shouldAdjustBounds: false
            }
        }

        case types.GET_RESTAURANTS_FOR_IDS_REQUEST: {
            return {
                ...state,
                requestingRestaurantDetails: true,
            };
        }

        case types.GET_RESTAURANTS_FOR_IDS_SUCCESS: {
            const newCurrentRestaurants = state.currentRestaurants ? new Map([...state.currentRestaurants, ...action.data]) : action.data;

            return {
                ...state,
                currentRestaurants: newCurrentRestaurants,
                error: '',
                requestingRestaurantDetails: false,
                pinData: getPinData(state.restaurantIdsForQuery, newCurrentRestaurants, state.aggregateReviewsData)
            }
        }

        case types.GET_RESTAURANTS_FOR_IDS_FAILURE: {
            return {
                ...state,
                error: action.error,
                requestingRestaurantDetails: false,
            }
        }

        case types.SET_SHOW_INFO_WINDOW: {
            return {
                ...state,
                showInfoWindow: action.data,
                shouldAdjustBounds: !action.data,
            }
        }

        case types.SET_INFO_WINDOW_PROPS: {
            return {
                ...state,
                infoWindowProps: action.data,
                shouldAdjustBounds: false,
            }
        }

        case types.SET_SHOW_MAP_SEARCH_BUTTON: {
            return {
                ...state,
                showMapSearchButton: action.data,
                shouldAdjustBounds: false,
            }
        }

        default:
            return state;
    }
}

export const restaurantsActions = {
    startGetRestaurantsForQueryRequest: (textQuery, location, radius) => ({ type: types.GET_RESTAURANTS_FOR_QUERY_REQUEST, textQuery, location, radius }),
    successfulGetRestaurantsForQueryRequest: (data, aggregateReviewsData) => ({ type: types.GET_RESTAURANTS_FOR_QUERY_SUCCESS, data, aggregateReviewsData}),
    failedGetRestaurantsForQueryRequest: error => ({ type: types.GET_RESTAURANTS_FOR_QUERY_FAILURE, error }),
    startGetRestaurantsForIdsRequest: restaurantIds => ({ type: types.GET_RESTAURANTS_FOR_IDS_REQUEST, restaurantIds }),
    successfulGetRestaurantsForIdsRequest: data => ({ type: types.GET_RESTAURANTS_FOR_IDS_SUCCESS, data }),
    failedGetRestaurantsForIdsRequest: error => ({ type: types.GET_RESTAURANTS_FOR_IDS_FAILURE, error }),
    updateSearchQuery: data => ({ type: types.UPDATE_CURRENT_SEARCH_QUERY, data }),
    setLocation: data => ({ type: types.SET_LOCATION, data }),
    setSelectedView: data => ({ type: types.SET_SELECTED_VIEW, data }),
    setShowInfoWindow: data => ({ type: types.SET_SHOW_INFO_WINDOW, data }),
    setInfoWindowProps: data => ({ type: types.SET_INFO_WINDOW_PROPS, data }),
    setShowMapSearchButton: data => ({ type: types.SET_SHOW_MAP_SEARCH_BUTTON, data }),
}