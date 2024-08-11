import { PropTypes } from 'prop-types';

import { Breadcrumb, Button, ErrorBanner, FrySpinner, LinkButton, ReviewCardList } from '../Common';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    reviewsError: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};

const Critic = ({ match: { params: { accountId } }, reviews, reviewsError, loggedIn, currentRestaurants, requestingReviews }) => {
    const reviewsBody = () => {
        if (!reviews) {
            return <FrySpinner />;
        } else if (reviews.length == 0) {
            return <p>Sorry, we could not identify this critic.</p>
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
            { !requestingReviews && reviews && <h1>{criticName}'s Reviews</h1> }
            {reviewsBody()}
        </div>
    )
}

Critic.propTypes = propTypes;

export default Critic;
