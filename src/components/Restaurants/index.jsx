import { PropTypes } from 'prop-types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, ErrorBanner, FrySpinner } from '../Common';
import SearchInput from './SearchInput';
import { PATH_REVIEWS, PATH_VARIABLE_RESTAURANT_ID } from '../../constants.js'

import style from './style.css';

import { Score } from "../Common"

const propTypes = {
    restaurants: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    getRestaurants: PropTypes.func.isRequired,
    currentSearchQuery: PropTypes.string.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    location: PropTypes.object,
    aggregateReviewsData: PropTypes.object.isRequired
}

const Restaurants = ({ restaurants, error, getRestaurants, currentSearchQuery, updateSearchQuery, location, aggregateReviewsData }) => {
    const restaurantsDisplay = (restaurants) => {
        if (restaurants && restaurants.length > 0) {
            return restaurants.map((restaurant, i) => {
                let restaurantLink = `${PATH_REVIEWS}`.replace(PATH_VARIABLE_RESTAURANT_ID, restaurant.id)
                return (
                    <Fragment key = {i}>
                        <p className="inline-paragraph"><b><Link to={restaurantLink}>{restaurant.displayName.text}</Link></b></p>
                        {aggregateReviewsData[restaurant.id] && <Score size="sm" score={aggregateReviewsData[restaurant.id].avgScore} />}
                        <p>{restaurant.formattedAddress}</p>
                    </Fragment>
                )});
        } else if (restaurants && restaurants.length === 0) {
            return 'No restaurants found for this search.';
        } else {
            return <FrySpinner />;
        }
    }

    return (
        <div>
            <ErrorBanner error = {error} />
            <Breadcrumb />
            <SearchInput
                getRestaurants = {getRestaurants}
                currentSearchQuery = {currentSearchQuery}
                updateSearchQuery = {updateSearchQuery}
                location = {location}
            />
            {restaurantsDisplay(restaurants)}
        </div>
    );
}

Restaurants.propTypes = propTypes;

export default Restaurants;