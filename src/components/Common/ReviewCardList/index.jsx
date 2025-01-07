import { PropTypes } from 'prop-types';
import { ReviewCard } from '../';
import {reviewsActions} from '../../../redux/reducers/reviews';
import { useDispatch} from 'react-redux';
import {useEffect} from 'react';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    currentRestaurants: PropTypes.object,
};

const ReviewCardList = ({ reviews, currentRestaurants }) => {
    const dispatch = useDispatch();
    
    useEffect(() => { 
        dispatch(reviewsActions.setReviews(reviews)); 
    }, [dispatch, reviews]);
    
    return (
        reviews.map(review => (
            <ReviewCard
                review={review}
                restaurant={currentRestaurants ? currentRestaurants.get(review.restaurantId) : null}
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