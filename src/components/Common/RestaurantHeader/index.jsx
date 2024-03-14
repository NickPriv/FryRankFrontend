import { PropTypes } from 'prop-types';
import style from './style.css';

const propTypes = {
    currentRestaurant: PropTypes.object.isRequired,
    averageScore: PropTypes.number.isRequired,
};

const RestaurantHeader = ({ currentRestaurant, averageScore }) => {
    return (
        <div>
            <h1>{currentRestaurant.displayName.text}</h1>
            {averageScore && (<span className='score'>{averageScore}</span>)}
            <p>{currentRestaurant.formattedAddress}</p>
        </div>
    )
}

RestaurantHeader.propTypes = propTypes;

export default RestaurantHeader;