import { call, put, takeEvery } from 'redux-saga/effects'
//import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getAllReviewsForRestaurant(action) {
  try {
    const reviews = yield call(`/reviews`, action.payload.restaurantId)
    yield put({ type: 'GET_RESTAURANT_REVIEWS_SUCCESS', reviews: reviews })
  } catch (e) {
    yield put({ type: 'GET_RESTAURANT_REVIEWS_FAILURE', message: e.message })
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* getAllReviewsForRestaurantSaga() {
  yield takeEvery('GET_ALL_REVIEWS_FOR_RESTAURANT', getAllReviewsForRestaurant)
}

export default getAllReviewsForRestaurantSaga
