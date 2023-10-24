export const types = {
    GET_RESTAURANT_REVIEWS_REQUEST: "GET_RESTAURANT_REVIEWS_REQUEST",
    GET_RESTAURANT_REVIEWS_SUCCESS: "GET_RESTAURANT_REVIEWS_SUCCESS",
    GET_RESTAURANT_REVIEWS_FAILURE: "GET_RESTAURANT_REVIEWS_FAILURE",
    CREATE_REVIEW_FOR_RESTAURANT_REQUEST: "CREATE_REVIEW_FOR_RESTAURANT_REQUEST",
    CREATE_REVIEW_FOR_RESTAURANT_SUCCESS: "CREATE_REVIEW_FOR_RESTAURANT_SUCCESS",
    CREATE_REVIEW_FOR_RESTAURANT_FAILURE: "CREATE_REVIEW_FOR_RESTAURANT_FAILURE",
    UPDATE_CURRENT_REVIEW: "UPDATE_CURRENT_REVIEW"
}

export const initialState = {
  reviews: null,
  currentReview: {
    "restaurantId": null,
    "authorId": null,
    "score": null,
    "title": null,
    "body": null
  },
  error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_RESTAURANT_REVIEWS_REQUEST: {
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

        case types.CREATE_REVIEW_FOR_RESTAURANT_REQUEST: {
            return {
                ...state,
            };
        }

        case types.CREATE_REVIEW_FOR_RESTAURANT_SUCCESS: {
            return {
                ...state,
                error: ''
            };
        }

        case types.CREATE_REVIEW_FOR_RESTAURANT_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }

        case types.UPDATE_CURRENT_REVIEW: {
            return {
                ...state,
                currentReview: {
                    ...state.currentReview,
                    [action.name]: action.value
                }
            }
        }

        default:
            return state;
  }
}

export const reviewsActions = {
    startGetAllReviewsForRestaurantRequest: restaurantId => ({ type: types.GET_RESTAURANT_REVIEWS_REQUEST, restaurantId }),
    successfulGetAllReviewsForRestaurantRequest: data => ({ type: types.GET_RESTAURANT_REVIEWS_SUCCESS, data }),
    failedGetAllReviewsForRestaurantRequest: error => ({ type: types.GET_RESTAURANT_REVIEWS_FAILURE, error }),
    startCreateReviewForRestaurantRequest: review => ({ type: types.CREATE_REVIEW_FOR_RESTAURANT_REQUEST, review }),
    successfulCreateReviewForRestaurantRequest: () => ({ type: types.CREATE_REVIEW_FOR_RESTAURANT_SUCCESS }),
    failedCreateReviewForRestaurantRequest: error => ({ type: types.CREATE_REVIEW_FOR_RESTAURANT_FAILURE, error }),
    updateCurrentReview: (name, value) => ({ type: types.UPDATE_CURRENT_REVIEW, name, value })
}
