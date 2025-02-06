import { PropTypes } from 'prop-types';
import { Banner, FrySpinner, ReviewCardList } from '../Common';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    reviewsError: PropTypes.string.isRequired,
    accountId: PropTypes.string.IsRequired,
    currentRestaurants: PropTypes.object.isRequired,
    requestingReviews: PropTypes.bool.isRequired,
    restaurantsError: PropTypes.bool.isRequired,
};

const Critic = ({ params: { accountId }, reviews, reviewsError, currentRestaurants, requestingReviews, restaurantsError, otherUserSettings }) => {
    
    const reviewsBody = () => {
        if (!reviews) {
            return <FrySpinner />;
        } else if (reviews.length === 0) {
            return <p>Sorry, this critic has not yet published a review.</p>
        } else  {
            return (
                <ReviewCardList
                    reviews={reviews}
                    currentRestaurants={currentRestaurants}
                />
            )
        }
    }

    const criticName = otherUserSettings && otherUserSettings.username ? otherUserSettings.username : accountId;

    return (
        <div>
            <Banner type="error" message = {reviewsError} />
            <Banner type="error" message = {restaurantsError} />
            { !requestingReviews && reviews && <h1>{criticName}'s Reviews</h1> }
            {reviewsBody()}
        </div>
    )
}

Critic.propTypes = propTypes;

export default Critic;
