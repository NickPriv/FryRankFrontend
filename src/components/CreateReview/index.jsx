import { PropTypes } from 'prop-types';

import { Breadcrumb, ErrorBanner, FrySpinner, RestaurantHeader } from '../Common/';
import ReviewForm from './ReviewForm';

const propTypes = {
    error: PropTypes.string.isRequired,
    currentRestaurant: PropTypes.object.isRequired,
    currentReview: PropTypes.object.isRequired,
    updateCurrentReview: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    givenName: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
};

const CreateReview = ({ match: { params: { restaurantId } }, error, currentRestaurants, currentReview, updateCurrentReview, createReview, loggedIn, givenName, accountId }) => {
    const currentRestaurant = currentRestaurants && currentRestaurants.size > 0
                ? currentRestaurants.get(restaurantId)
                : null;

    if (!currentRestaurant) {
        return <FrySpinner />;
    }

    return (
        <div>
            <ErrorBanner error = {error} />
            <Breadcrumb aliases = {{[currentRestaurant.id]: currentRestaurant.displayName.text}} />
            <RestaurantHeader currentRestaurant = {currentRestaurant} />
            <ReviewForm
                createReview = {createReview}
                currentRestaurant = {currentRestaurant}
                currentReview = {currentReview}
                updateCurrentReview = {updateCurrentReview}
                loggedIn = {loggedIn}
                givenName = {givenName}
                accountId = {accountId}
            />
        </div>
    )
}

CreateReview.propTypes = propTypes;

export default CreateReview;
