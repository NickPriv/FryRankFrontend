export const PATH_VARIABLE_RESTAURANT_ID = ":restaurantId"

export const PATH_HOME = "/"
export const PATH_RESTAURANTS = "/restaurants"
export const PATH_REVIEWS = `${PATH_RESTAURANTS}/${PATH_VARIABLE_RESTAURANT_ID}`
export const PATH_CREATE_REVIEW = `${PATH_RESTAURANTS}/${PATH_VARIABLE_RESTAURANT_ID}/create`

export const BACKEND_SERVICE_PATH = process.env.REACT_APP_BACKEND_SERVICE_PATH;
export const AGGREGATE_INFORMATION_API_PATH = `${BACKEND_SERVICE_PATH}/reviews/aggregateInformation`;

export const FRENCH_FRIES_TEXT_QUERY = "french fries";

