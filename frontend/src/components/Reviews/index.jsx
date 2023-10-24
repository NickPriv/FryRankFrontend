import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ReviewCard from './ReviewCard';
import { ErrorBanner, RestaurantHeader } from '../Common';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    currentRestaurant: PropTypes.string.isRequired
};

const Reviews = ({ reviews, error, currentRestaurant }) => {

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
            <ErrorBanner error = {error} />
            <RestaurantHeader currentRestaurant = {currentRestaurant} />
            {reviews && reviewsBody()}
            {currentRestaurant && <Link to={'/reviews/' + currentRestaurant.id + '/create'}>
                <Button>
                    Click me to go to the create page
                </Button>
            </Link>}
        </div>
    )
}

Reviews.propTypes = propTypes;

export default Reviews;
