import { Homepage } from './components/Homepage';
import Restaurants from './containers/Restaurants';
import Reviews from './containers/Reviews';
import CreateReview from './containers/CreateReview';
import { PATH_HOME, PATH_RESTAURANTS, PATH_REVIEWS, PATH_VARIABLE_RESTAURANT_ID, PATH_CREATE_REVIEW } from "./constants.js"

const routes = [
    { path: PATH_HOME, component: Homepage },
    { path: PATH_REVIEWS, component: Reviews },
    { path: PATH_CREATE_REVIEW, component: CreateReview },
    { path: PATH_RESTAURANTS, component: Restaurants }
];

const pathToPageName = {
    [PATH_RESTAURANTS] : "Restaurants"
}

console.log(pathToPageName)

export { routes, pathToPageName }