import { PropTypes } from 'prop-types';
import style from './style.css';
import { Score } from "../"

const propTypes = {
    currentRestaurant: PropTypes.object.isRequired,
    averageScore: PropTypes.number.isRequired,
};

const RestaurantHeader = ({ currentRestaurant, averageScore }) => {
    return (
        <div>
            <h1 className='title'>{currentRestaurant.displayName.text}</h1>
            {averageScore && (<Score score={averageScore} size="lg"/>)}
            <p>{currentRestaurant.formattedAddress}</p>
        </div>
    )
}

RestaurantHeader.propTypes = propTypes;

export default RestaurantHeader;