import { PropTypes } from 'prop-types';
import { Fragment } from 'react';
import { Breadcrumb, ErrorBanner } from '../Common';
import SearchInput from './SearchInput';
import { BASE_URL, PATH_REVIEWS, PATH_VARIABLE_RESTAURANT_ID } from '../../constants.js'

const propTypes = {
    restaurants: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    getRestaurants: PropTypes.func.isRequired,
    currentSearchQuery: PropTypes.string.isRequired,
    updateSearchQuery: PropTypes.func.isRequired
}

const Restaurants = ({ restaurants, error, getRestaurants, currentSearchQuery, updateSearchQuery }) => {

    const restaurantsDisplay = (restaurants) => {
        return restaurants
            ? restaurants.map((restaurant, i) => {
                let restaurantLink = `${BASE_URL}${PATH_REVIEWS}`.replace(PATH_VARIABLE_RESTAURANT_ID, restaurant.id)
                return (
                    <Fragment key = {i}>
                        <p><b><a href={restaurantLink}>{restaurant.displayName.text}</a></b></p>
                        <p>{restaurant.formattedAddress}</p>
                    </Fragment>
                )})
            : 'No restaurants found for this search.';
    }

    return (
        <div>
            <ErrorBanner error = {error} />
            <Breadcrumb />
            <SearchInput
                getRestaurants = {getRestaurants}
                currentSearchQuery = {currentSearchQuery}
                updateSearchQuery = {updateSearchQuery}
            />
            {restaurantsDisplay(restaurants)}
        </div>
    );
}

Restaurants.propTypes = propTypes;

export default Restaurants;