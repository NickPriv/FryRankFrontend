import { PropTypes } from 'prop-types';

import { Breadcrumb, ErrorBanner, FrySpinner, RestaurantHeader } from '../Common/';
import ReviewForm from './ReviewForm';

const propTypes = {
    error: PropTypes.string.isRequired,
    currentRestaurant: PropTypes.object.isRequired,
    currentReview: PropTypes.object.isRequired,
    updateCurrentReview: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired
};

const CreateReview = ({ error, currentRestaurant, currentReview, updateCurrentReview, createReview }) => {
    if (!currentRestaurant) {
        return <FrySpinner />;
    }

    return (
        <div>
            <ErrorBanner error = {error} />
            <Breadcrumb />
            <RestaurantHeader currentRestaurant = {currentRestaurant} />
            <ReviewForm
                createReview = {createReview}
                currentRestaurant = {currentRestaurant}
                currentReview = {currentReview}
                updateCurrentReview = {updateCurrentReview}
            />
        </div>
    )
}

CreateReview.propTypes = propTypes;

export default CreateReview;
