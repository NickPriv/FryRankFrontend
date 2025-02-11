import { PropTypes } from 'prop-types';
import { ReviewCard } from '../';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    currentRestaurants: PropTypes.object,
    onRefresh: PropTypes.func
};

const ReviewCardList = ({ reviews, currentRestaurants, onRefresh }) => {
    return (
        reviews?.map(review => (
            <ReviewCard
                review={review}
                restaurant={currentRestaurants ? currentRestaurants.get(review.restaurantId) : null}
                onRefresh={onRefresh}
            />
        )).sort((a,b) => {
            // We declare the past for undefined values so that they sort to the end of the array.
            const past = new Date(0)
            let dateA = a.props.review.isoDateTime ? new Date(a.props.review.isoDateTime) : past
            let dateB = b.props.review.isoDateTime ? new Date(b.props.review.isoDateTime) : past
            return dateB.getTime() - dateA.getTime()
        })
    )
}

ReviewCardList.propTypes = propTypes;

export default ReviewCardList;