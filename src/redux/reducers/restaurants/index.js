export const types = {
    GET_RESTAURANTS_REQUEST: "GET_RESTAURANTS_REQUEST",
    GET_RESTAURANTS_SUCCESS: "GET_RESTAURANTS_SUCCESS",
    GET_RESTAURANTS_FAILURE: "GET_RESTAURANTS_FAILURE",
    GET_RESTAURANTS_FOR_IDS_REQUEST: "GET_RESTAURANTS_FOR_IDS_REQUEST",
    GET_RESTAURANTS_FOR_IDS_SUCCESS: "GET_RESTAURANTS_FOR_IDS_SUCCESS",
    GET_RESTAURANTS_FOR_IDS_FAILURE: "GET_RESTAURANTS_FOR_IDS_FAILURE",
    UPDATE_CURRENT_SEARCH_QUERY: "UPDATE_CURRENT_SEARCH_QUERY",
    SET_LOCATION: "SET_LOCATION",
    RESET_CURRENT_RESTAURANT: "RESET_CURRENT_RESTAURANT"
}

export const initialState = {
  restaurants: null,
  currentRestaurants: null,
  error: '',
  requestingRestaurantDetails: false,
  searchQuery: '',
  location: null,
  aggregateReviewsData: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_RESTAURANTS_REQUEST: {
            return {
                ...state
            };
        }

        case types.GET_RESTAURANTS_SUCCESS: {
            const restaurants = action.data.places,
            const newRestaurants = new Map();
            for (var restaurant in restaurants) {
                newRestaurants.put(restaurant.id, restaurant);
            }

            return {
                ...state,
                restaurants: restaurants,
                currentRestaurants: new Map([...currentRestaurants, ...newRestaurants])
                aggregateReviewsData: action.aggregateReviewsData,
                error: ''
            };
        }

        case types.GET_RESTAURANTS_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }

        case types.SET_LOCATION: {
            return {
                ...state,
                location: action.data
            };
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
            const restaurants = action.data,
            const newRestaurants = new Map();
            for (var restaurant in restaurants) {
                newRestaurants.put(restaurant.id, restaurant);
            }

            return {
                ...state,
               currentRestaurants: new Map([...currentRestaurants, ...newRestaurants])
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

        default:
            return state;
  }
}

export const restaurantsActions = {
    startGetRestaurantsRequest: (textQuery, location) => ({ type: types.GET_RESTAURANTS_REQUEST, textQuery, location }),
    successfulGetRestaurantsRequest: (data, aggregateReviewsData) => ({ type: types.GET_RESTAURANTS_SUCCESS, data, aggregateReviewsData}),
    failedGetRestaurantsRequest: error => ({ type: types.GET_RESTAURANTS_FAILURE, error }),
    startGetRestaurantsForIdsRequest: restaurantIds => ({ type: types.GET_RESTAURANTS_FOR_IDS_REQUEST, restaurantIds }),
    successfulGetRestaurantsForIdsRequest: data => ({ type: types.GET_RESTAURANTS_FOR_IDS_SUCCESS, data }),
    failedGetRestaurantByIdRequest: error => ({ type: types.GET_RESTAURANTS_FOR_IDS_FAILURE, error }),
    updateSearchQuery: data => ({ type: types.UPDATE_CURRENT_SEARCH_QUERY, data }),
    setLocation: data => ({ type: types.SET_LOCATION, data })
}