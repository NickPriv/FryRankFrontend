import { PropTypes } from 'prop-types';
import { Fragment } from 'react';
import { AddressDisplay, Breadcrumb, FrySpinner, Header } from '../Common';
import { BASE_URL, PATH_REVIEWS, PATH_VARIABLE_RESTAURANT_ID } from '../../constants.js'

const propTypes = {
    restaurants: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired
}

const Restaurants = ({ restaurants, error }) => {

    const restaurantsDisplay = (restaurants) => {
        return restaurants.map((restaurant, i) => {
            let restaurantLink = `${BASE_URL}${PATH_REVIEWS}`.replace(PATH_VARIABLE_RESTAURANT_ID, restaurant.id)
            return (
                <Fragment key = {i}>
                    <p><b><a href={restaurantLink} >{restaurant.name}</a></b> </p>
                    <AddressDisplay address={restaurant.address} />
                </Fragment>
            )
        });
    }

    if(!restaurants) {
        return <p>{error}</p>;
    }
    else if (restaurants.length === 0) {
        return (
            <div>
                <FrySpinner />
            </div>
        )
    }
    else {
        return (
            <div>
                <Header />
                <Breadcrumb />
                {restaurantsDisplay(restaurants)}
            </div>
        );
    }
}

Restaurants.propTypes = propTypes;

export default Restaurants;