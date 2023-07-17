import { GET_ALL_REVIEWS_FOR_RESTAURANT } from "../actionTypes";

export const getAllReviewsForRestaurant = (restaurantId) => ({
  type: GET_ALL_REVIEWS_FOR_RESTAURANT,
  payload: { restaurantId },
});
