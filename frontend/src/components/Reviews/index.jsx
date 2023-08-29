import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired
};

const Reviews = ({ reviews, error }) => {

    const reviewsDisplay = (reviews) => {
        return reviews.map(review => (
            <Fragment>
                <h2>{review.title}</h2>
                <p>Author: {review.authorId}</p>
                <p>Score: {review.score}</p>
                <p>{review.body}</p>
            </Fragment>
        ));
    }

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

Reviews.propTypes = propTypes;

export default Reviews;
