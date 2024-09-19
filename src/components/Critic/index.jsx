import { PropTypes } from 'prop-types';

import { Breadcrumb, Button, ErrorBanner, FrySpinner, LinkButton, ReviewCardList } from '../Common';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    reviewsError: PropTypes.string.isRequired,
    accountId: PropTypes.string.IsRequired,
    currentRestaurants: PropTypes.object.isRequired,
    requestingReviews: PropTypes.bool.isRequired,
    restaurantsError: PropTypes.bool.isRequired,
};

const Critic = ({ params: { accountId }, reviews, reviewsError, currentRestaurants, requestingReviews, restaurantsError }) => {
    const reviewsBody = () => {
        if (!reviews) {
            return <FrySpinner />;
        } else if (reviews.length == 0) {
            return <p>Sorry, this critic has not yet published a review.</p>
        } else {
            return (
                <ReviewCardList
                    reviews={reviews}
                    currentRestaurants={currentRestaurants}
                />
            )
        }
    }

    const criticName = reviews && reviews.length > 0 && reviews[0].authorId ? reviews[0].authorId : accountId;

    return (
        <div>
            <ErrorBanner error = {reviewsError} />
            <ErrorBanner error = {restaurantsError} />
            { !requestingReviews && reviews && <h1>{criticName}'s Reviews</h1> }
            {reviewsBody()}
        </div>
    )
}

Critic.propTypes = propTypes;

export default Critic;
