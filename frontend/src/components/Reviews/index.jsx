import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import ReviewCard from './ReviewCard';
import { Breadcrumb, ErrorBanner, FrySpinner, Header, RestaurantHeader } from '../Common';

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

    if (!currentRestaurant) {
        return <FrySpinner />;
    }

    return (
        <div>
            <Header />
            <ErrorBanner error = {error} />
            <Breadcrumb />
            <RestaurantHeader currentRestaurant = {currentRestaurant} />
            {reviews && reviewsBody()}
            <Link to={'/restaurants/' + currentRestaurant.id + '/create'}>
                <Button color="danger">
                    Write a review
                </Button>
            </Link>
            <Link to={'/restaurants/'}>
                <Button color="secondary">
                    Back to all restaurants
                </Button>
            </Link>
        </div>
    )
}

Reviews.propTypes = propTypes;

export default Reviews;
