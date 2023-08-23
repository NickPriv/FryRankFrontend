import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired
};

const Reviews = ({ reviews, error }) => {

    const reviewsDisplay = (reviews) => {
        const reviewsView = reviews.map(review => (
            <Fragment>
                <h2>{review.title}</h2>
                <p>Author: {review.authorId}</p>
                <p>Score: {review.score}</p>
                <p>{review.body}</p>
            </Fragment>
        ));

        return reviewsView;
    }

    if(!reviews || reviews.length == 0) {
        return <p>{error}</p>;
    } else {
        return (
            <div>
                {reviewsDisplay(reviews)}
            </div>
        );
    }
}

Reviews.propTypes = propTypes;

export default Reviews;
