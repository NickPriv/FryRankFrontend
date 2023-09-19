import { PropTypes } from 'prop-types';
import { Fragment } from 'react';
import FrySpinner from '../Common/FrySpinner'
import AddressDisplay from '../Common/AddressDisplay'

const propTypes = {
    restaurants: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired
}

const Restaurants = ({ restaurants, error }) => {

    const restaurantsDisplay = (restaurants) => {
        return restaurants.map((restaurant, i) => (
            <Fragment key = {i}>
                <p><b>{restaurant.name}</b> </p>
                <AddressDisplay address={restaurant.address} />
            </Fragment>
        ));
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
                {restaurantsDisplay(restaurants)}
            </div>
        );
    }
}

Restaurants.propTypes = propTypes;

export default Restaurants;