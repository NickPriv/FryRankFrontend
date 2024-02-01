import { PropTypes } from 'prop-types';

const propTypes = {
    currentRestaurant: PropTypes.object.isRequired
};

const RestaurantHeader = ({ currentRestaurant }) => {
    return (
        <div>
            <h1>{currentRestaurant.displayName.text}</h1>
            <p>{currentRestaurant.formattedAddress}</p>
        </div>
    )
}

RestaurantHeader.propTypes = propTypes;

export default RestaurantHeader;