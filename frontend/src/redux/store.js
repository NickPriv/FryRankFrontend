import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga"

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

console.log("Printing store")
console.log(store.getState())

sagaMiddleware.run(rootSaga)

export default store;
