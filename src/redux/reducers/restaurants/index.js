import { SELECTED_VIEW } from '../../../constants';

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
    SET_INFO_WINDOW_PROPS: "SET_INFO_WINDOW_PROPS"
}

export const initialState = {
  currentRestaurants: null,
  restaurantIdsForQuery: null,
  error: '',
  requestingRestaurantDetails: false,
  searchQuery: '',
  location: null,
  aggregateReviewsData: null,
  selectedView: SELECTED_VIEW.MAP,
  showInfoWindow: false,
  infoWindowProps: {
      name: 'default name',
   },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_RESTAURANTS_FOR_QUERY_REQUEST: {
            return {
                ...state
            };
        }

        case types.GET_RESTAURANTS_FOR_QUERY_SUCCESS: {

            const queriedRestaurantsMap = new Map();
            action.data.places.forEach(place => queriedRestaurantsMap.set(place.id, place));

            return {
                ...state,
                currentRestaurants: state.currentRestaurants ? new Map([...state.currentRestaurants, ...queriedRestaurantsMap]) : queriedRestaurantsMap,
                restaurantIdsForQuery: action.data.places.map(place => place.id),
                aggregateReviewsData: action.aggregateReviewsData,
                error: ''
            };
        }

        case types.GET_RESTAURANTS_FOR_QUERY_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }

        case types.SET_LOCATION: {

            console.log("location set to: " + action.data);
            console.log("latitude: " + action.data.latitude);
            return {
                ...state,
                location: action.data
            };
        }

        case types.SET_SELECTED_VIEW: {
            return {
                ...state,
                selectedView: action.data
            }
        }

        case types.UPDATE_CURRENT_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: action.data
            }
        }

        case types.GET_RESTAURANTS_FOR_IDS_REQUEST: {
            return {
                ...state,
                requestingRestaurantDetails: true,
            };
        }

        case types.GET_RESTAURANTS_FOR_IDS_SUCCESS: {
            return {
                ...state,
                currentRestaurants: state.currentRestaurants ? new Map([...state.currentRestaurants, ...action.data]) : action.data,
                error: '',
                requestingRestaurantDetails: false,
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
            }
        }

        case types.SET_INFO_WINDOW_PROPS: {
            console.log("called set info window props: " + JSON.stringify(action.data));
            return {
                ...state,
                infoWindowProps: action.data,
            }
        }

        default:
            return state;
    }
}

export const restaurantsActions = {
    startGetRestaurantsForQueryRequest: (textQuery, location) => ({ type: types.GET_RESTAURANTS_FOR_QUERY_REQUEST, textQuery, location }),
    successfulGetRestaurantsForQueryRequest: (data, aggregateReviewsData) => ({ type: types.GET_RESTAURANTS_FOR_QUERY_SUCCESS, data, aggregateReviewsData}),
    failedGetRestaurantsForQueryRequest: error => ({ type: types.GET_RESTAURANTS_FOR_QUERY_FAILURE, error }),
    startGetRestaurantsForIdsRequest: restaurantIds => ({ type: types.GET_RESTAURANTS_FOR_IDS_REQUEST, restaurantIds }),
    successfulGetRestaurantsForIdsRequest: data => ({ type: types.GET_RESTAURANTS_FOR_IDS_SUCCESS, data }),
    failedGetRestaurantsForIdsRequest: error => ({ type: types.GET_RESTAURANTS_FOR_IDS_FAILURE, error }),
    updateSearchQuery: data => ({ type: types.UPDATE_CURRENT_SEARCH_QUERY, data }),
    setLocation: data => ({ type: types.SET_LOCATION, data }),
    setSelectedView: data => ({ type: types.SET_SELECTED_VIEW, data }),
    setShowInfoWindow: data => ({ type: types.SET_SHOW_INFO_WINDOW, data }),
    setInfoWindowProps: data => ({ type: types.SET_INFO_WINDOW_PROPS, data })
}