export const BASE_URL = "http://localhost:3000"

export const PATH_VARIABLE_RESTAURANT_ID = ":restaurantId"

export const PATH_HOME = "/"
export const PATH_RESTAURANTS = "/restaurants"
export const PATH_REVIEWS = `${PATH_RESTAURANTS}/${PATH_VARIABLE_RESTAURANT_ID}`
export const PATH_CREATE_REVIEW = `${PATH_RESTAURANTS}/${PATH_VARIABLE_RESTAURANT_ID}/create`

