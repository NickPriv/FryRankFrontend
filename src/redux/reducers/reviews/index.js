export const types = {
    GET_RESTAURANT_REVIEWS_REQUEST: "GET_RESTAURANT_REVIEWS_REQUEST",
    GET_RESTAURANT_REVIEWS_SUCCESS: "GET_RESTAURANT_REVIEWS_SUCCESS",
    GET_RESTAURANT_REVIEWS_FAILURE: "GET_RESTAURANT_REVIEWS_FAILURE",
    CREATE_REVIEW_FOR_RESTAURANT_REQUEST: "CREATE_REVIEW_FOR_RESTAURANT_REQUEST",
    CREATE_REVIEW_FOR_RESTAURANT_SUCCESS: "CREATE_REVIEW_FOR_RESTAURANT_SUCCESS",
    CREATE_REVIEW_FOR_RESTAURANT_FAILURE: "CREATE_REVIEW_FOR_RESTAURANT_FAILURE",
    UPDATE_CURRENT_REVIEW: "UPDATE_CURRENT_REVIEW",
    RESET_CREATE_REQUEST: "RESET_CREATE_REQUEST"
}

export const initialState = {
  reviews: null,
  averageScore: null,
  currentReview: {
    "restaurantId": null,
    "authorId": null,
    "score": null,
    "title": null,
    "body": null
  },
  error: '',
  successfulCreate: null
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
                reviews: action.data.reviews,
                averageScore: action.data.averageScore,
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
                currentReview: {
                    // Reset the current review, except for the restaurantId, which gets set on page load
                    ...initialState.currentReview,
                    restaurantId: state.currentReview.restaurantId
                }
            };
        }

        case types.CREATE_REVIEW_FOR_RESTAURANT_SUCCESS: {
            return {
                ...state,
                successfulCreate: true,
                error: ''
            };
        }

        case types.CREATE_REVIEW_FOR_RESTAURANT_FAILURE: {
            return {
                ...state,
                successfulCreate: false,
                error: action.error,
            }
        }

        case types.UPDATE_CURRENT_REVIEW: {
            return {
                ...state,
                currentReview: {
                    ...state.currentReview,
                    [action.name]: action.value != "" ? action.value : null
                }
            }
        }

        case types.RESET_CREATE_REQUEST: {
            return {
                ...state,
                successfulCreate: null
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
    updateCurrentReview: (name, value) => ({ type: types.UPDATE_CURRENT_REVIEW, name, value }),
    resetCreateRequest: () => ({ type: types.RESET_CREATE_REQUEST })
}
