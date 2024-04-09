export const types = {
    GET_RESTAURANTS_REQUEST: "GET_RESTAURANTS_REQUEST",
    GET_RESTAURANTS_SUCCESS: "GET_RESTAURANTS_SUCCESS",
    GET_RESTAURANTS_FAILURE: "GET_RESTAURANTS_FAILURE",
    GET_RESTAURANT_BY_ID_REQUEST: "GET_RESTAURANT_BY_ID_REQUEST",
    GET_RESTAURANT_BY_ID_SUCCESS: "GET_RESTAURANT_BY_ID_SUCCESS",
    GET_RESTAURANT_BY_ID_FAILURE: "GET_RESTAURANT_BY_ID_FAILURE",
    UPDATE_CURRENT_SEARCH_QUERY: "UPDATE_CURRENT_SEARCH_QUERY"
}

export const initialState = {
  restaurants: null,
  currentRestaurant: null,
  error: '',
  requestingRestaurantDetails: false,
  searchQuery: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_RESTAURANTS_REQUEST: {
            return {
                ...state
            };
        }

        case types.GET_RESTAURANTS_SUCCESS: {
            return {
                ...state,
                restaurants: action.data.places,
                error: ''
            };
        }

        case types.GET_RESTAURANTS_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }

        case types.UPDATE_CURRENT_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: action.data
            }
        }

        case types.GET_RESTAURANT_BY_ID_REQUEST: {
            return {
                ...state,
                requestingRestaurantDetails: true,
            };
        }

        case types.GET_RESTAURANT_BY_ID_SUCCESS: {
            return {
                ...state,
               currentRestaurant: action.data,
               error: '',
               requestingRestaurantDetails: false,
            }
        }

        case types.GET_RESTAURANT_BY_ID_FAILURE: {
            return {
                ...state,
                error: action.error,
                requestingRestaurantDetails: false,
            }
        }

        default:
            return state;
  }
}

export const restaurantsActions = {
    startGetRestaurantsRequest: (textQuery, location) => ({ type: types.GET_RESTAURANTS_REQUEST, textQuery, location }),
    successfulGetRestaurantsRequest: data => ({ type: types.GET_RESTAURANTS_SUCCESS, data }),
    failedGetRestaurantsRequest: error => ({ type: types.GET_RESTAURANTS_FAILURE, error }),
    startGetRestaurantByIdRequest: restaurantId => ({ type: types.GET_RESTAURANT_BY_ID_REQUEST, restaurantId }),
    successfulGetRestaurantByIdRequest: data => ({ type: types.GET_RESTAURANT_BY_ID_SUCCESS, data }),
    failedGetRestaurantByIdRequest: error => ({ type: types.GET_RESTAURANT_BY_ID_FAILURE, error }),
    updateSearchQuery: data => ({ type: types.UPDATE_CURRENT_SEARCH_QUERY, data })
}