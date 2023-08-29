export const types = {
    GET_ALL_REVIEWS_FOR_RESTAURANT: "GET_ALL_REVIEWS_FOR_RESTAURANT",
    GET_RESTAURANT_REVIEWS_SUCCESS: "GET_RESTAURANT_REVIEWS_SUCCESS",
    GET_RESTAURANT_REVIEWS_FAILURE: "GET_RESTAURANT_REVIEWS_FAILURE",
    GET_ERROR: "GET_ERROR",
}

export const initialState = {
  reviews: [],
  error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_REVIEWS_FOR_RESTAURANT: {
            return {
                ...state
            };
        }

        case types.GET_RESTAURANT_REVIEWS_SUCCESS: {
            return {
                ...state,
                reviews: action.data,
                error: ''
            };
        }

        case types.GET_RESTAURANT_REVIEWS_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }

        case types.GET_ERROR:
            return {
                ...state,
                error: state.errorMessage,
            }

        default:
            return state;
  }
}

export const reviewsActions = {
    startGetAllReviewsForRestaurantRequest: restaurantId => ({ type: types.GET_ALL_REVIEWS_FOR_RESTAURANT, restaurantId }),
    successfulGetAllReviewsForRestaurantRequest: data => ({ type: types.GET_RESTAURANT_REVIEWS_SUCCESS, data }),
    failedGetAllReviewsForRestaurantRequest: error => ({ type: types.GET_RESTAURANT_REVIEWS_FAILURE, error }),
    getError: () => ({ type: types.GET_ERROR }),
}
