import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga"

import restaurantReviewReducer from "./reducers/restaurantReviewReducer";
import getAllReviewsForRestaurantSaga from "./sagas/restaurantReviewSagas";

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: restaurantReviewReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(getAllReviewsForRestaurantSaga)

export default store;
