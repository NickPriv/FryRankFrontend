import { PropTypes } from 'prop-types';

import ReviewCard from './ReviewCard';
import AddressDisplay from '../Common/AddressDisplay';
import FrySpinner from '../Common/FrySpinner';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    currentRestaurant: PropTypes.string.isRequired
};

const Reviews = ({ reviews, error, currentRestaurant }) => {

    const reviewsDisplay = (reviews) => {
        return reviews.map(review => (
            <ReviewCard title={review.title} authorId={review.authorId} score={review.score} body={review.body} />
        ));
    }

    const reviewsBody = () => {
        if(!reviews) {
            return <p>{error}</p>;
        } else if (reviews.length == 0) {
            return <p>No reviews exist for this restaurant yet. Why don't you write the first one?</p>
        } else {
            return (
                <div>{reviewsDisplay(reviews)}</div>
            );
        }
    }

    const restaurantHeader = () => {
        if(!currentRestaurant) {
            return <FrySpinner />
        } else {
            return (
                <div>
                    <h1>{currentRestaurant.name}</h1>
                    <AddressDisplay address = {currentRestaurant.address} />
                </div>
            )
        }
    }

    return (
        <div>
            {restaurantHeader()}
            {reviewsBody()}
        </div>
    )
}

Reviews.propTypes = propTypes;

export default Reviews;
