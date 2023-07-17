import { GET_ALL_REVIEWS_FOR_RESTAURANT } from "../actionTypes";

const initialState = {
  reviews: {},
};

const restaurantReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS_FOR_RESTAURANT:
      return {
        ...state,
        reviews: state.reviews,
      };
    default:
      return state;
  }
};

export default restaurantReviewReducer;
