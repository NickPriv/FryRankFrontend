import { PropTypes } from 'prop-types';

import ReviewCard from './ReviewCard';
import { Breadcrumb, ErrorBanner, FrySpinner, LinkButton, RestaurantHeader } from '../Common';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    reviewsError: PropTypes.string.isRequired,
    restaurantsError: PropTypes.string.isRequired,
    currentRestaurant: PropTypes.object.isRequired,
    averageScore: PropTypes.number.isRequired,
    requestingRestaurantDetails: PropTypes.bool.isRequired
};

const Reviews = ({ reviews, reviewsError, restaurantsError, currentRestaurant, requestingRestaurantDetails, averageScore }) => {

    const reviewsBody = () => {
        if (reviews.length == 0) {
            return <p>No reviews exist for this restaurant yet. Why don't you write the first one?</p>
        } else {
            return reviews.map(review => (
                <ReviewCard title={review.title} authorId={review.authorId} score={review.score} body={review.body} />
            ));
        }
    }

    return (
        <div>
            <ErrorBanner error = {reviewsError} />
            <ErrorBanner error = {restaurantsError} />
            { currentRestaurant && <Breadcrumb aliases = {{[currentRestaurant.id]: currentRestaurant.displayName.text}}/> }
            { requestingRestaurantDetails && <FrySpinner /> }
            { currentRestaurant &&
                <div>
                   <RestaurantHeader currentRestaurant={currentRestaurant} averageScore={averageScore} />
                   <LinkButton
                       link={'/restaurants/' + currentRestaurant.id + '/create'}
                       children='Write a review'
                       color='danger'
                   />
                   <LinkButton
                       link='/restaurants/'
                       children='Back to all restaurants'
                       color='secondary'
                   />
                </div> }
                {reviews && reviewsBody()}
        </div>
    )
}

Reviews.propTypes = propTypes;

export default Reviews;
