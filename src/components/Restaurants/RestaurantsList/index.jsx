import { PropTypes } from 'prop-types';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FrySpinner, Score } from '../../Common';
import { PATH_RESTAURANT_REVIEWS, PATH_VARIABLE_RESTAURANT_ID } from '../../../constants.js';

const propTypes = {
    restaurantIds: PropTypes.array,
    currentRestaurants: PropTypes.object,
    aggregateReviewsData: PropTypes.object
}

const RestaurantsList = ({ restaurantIds, currentRestaurants, aggregateReviewsData }) => {
    const restaurants = restaurantIds && currentRestaurants
        ? Array.from(currentRestaurants.values()).filter(restaurant => restaurantIds.includes(restaurant.id))
        : null;

    console.log("restaurants is " + JSON.stringify(restaurants));

    if (restaurants && restaurants.length > 0) {
        return restaurants.map((restaurant, i) => {
            let restaurantLink = `${PATH_RESTAURANT_REVIEWS}`.replace(PATH_VARIABLE_RESTAURANT_ID, restaurant.id)
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

RestaurantsList.propTypes = propTypes;

export default RestaurantsList;