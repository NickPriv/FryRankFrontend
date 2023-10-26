import { PropTypes } from 'prop-types';

import { AddressDisplay, FrySpinner } from '../';

const propTypes = {
    currentRestaurant: PropTypes.object.isRequired
};

const RestaurantHeader = ({ currentRestaurant }) => {
    return (
        <div>
            <h1>{currentRestaurant.name}</h1>
            <AddressDisplay address = {currentRestaurant.address} />
        </div>
    )
}

RestaurantHeader.propTypes = propTypes;

export default RestaurantHeader;