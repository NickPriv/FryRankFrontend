export const types = {
    GET_RESTAURANTS_REQUEST: "GET_RESTAURANTS_REQUEST",
    GET_RESTAURANTS_SUCCESS: "GET_RESTAURANTS_SUCCESS",
    GET_RESTAURANTS_FAILURE: "GET_RESTAURANTS_FAILURE",
    GET_RESTAURANT_BY_ID_REQUEST: "GET_RESTAURANT_BY_ID_REQUEST",
    GET_RESTAURANT_BY_ID_SUCCESS: "GET_RESTAURANT_BY_ID_SUCCESS",
    GET_RESTAURANT_BY_ID_FAILURE: "GET_RESTAURANT_BY_ID_FAILURE"
}

export const initialState = {
  restaurants: [],
  currentRestaurant: null,
  error: '',
  requestingRestaurantDetails: false,
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
                restaurants: action.data,
                error: ''
            };
        }

        case types.GET_RESTAURANTS_FAILURE: {
            return {
                ...state,
                error: action.error,
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
    startGetRestaurantsRequest: () => ({ type: types.GET_RESTAURANTS_REQUEST }),
    successfulGetRestaurantsRequest: data => ({ type: types.GET_RESTAURANTS_SUCCESS, data }),
    failedGetRestaurantsRequest: error => ({ type: types.GET_RESTAURANTS_FAILURE, error }),
    startGetRestaurantByIdRequest: restaurantId => ({ type: types.GET_RESTAURANT_BY_ID_REQUEST, restaurantId }),
    successfulGetRestaurantByIdRequest: data => ({ type: types.GET_RESTAURANT_BY_ID_SUCCESS, data }),
    failedGetRestaurantByIdRequest: error => ({ type: types.GET_RESTAURANT_BY_ID_FAILURE, error })
}