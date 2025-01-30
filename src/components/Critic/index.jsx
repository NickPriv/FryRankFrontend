import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewsActions } from '../../redux/reducers/reviews';
import { Banner, FrySpinner, ReviewCardList } from '../Common';
import { fetchRestaurantDetails } from '../../containers/RecentReviews';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    reviewsError: PropTypes.string.isRequired,
    accountId: PropTypes.string.IsRequired,
    currentRestaurants: PropTypes.object.isRequired,
    requestingReviews: PropTypes.bool.isRequired,
    restaurantsError: PropTypes.bool.isRequired,
};

const Critic = ({ params: { accountId }, reviews, reviewsError, currentRestaurants, requestingReviews, restaurantsError, otherUserSettings }) => {
    const dispatch = useDispatch();
    const [restaurantData, setRestaurantData] = useState(new Map());
    const [loading, setLoading] = useState(false);

    const reviewsBody = () => {
        
        const onRefresh = async ()=> {
            setLoading(true)
            setTimeout(async ()=> {
            dispatch(reviewsActions.startGetAllReviewsForAccountRequest(accountId));
           
            
            if (reviews) {
                const restaurantIds = Array.from(new Set(reviews.map(review => review.restaurantId)));
                const details = await fetchRestaurantDetails(restaurantIds);
                let restaurantDict = new Map();
                details.forEach(detail => {
                    restaurantDict.set(detail.id, detail);
                });

                setRestaurantData(restaurantDict);
                setLoading(false);
            }
        },200)
          
        }

        if (!reviews || loading) {
            return <FrySpinner />;
        } else if (reviews.length === 0) {
            return <p>Sorry, this critic has not yet published a review.</p>
        } else if (loading === false) {
            return (
                <ReviewCardList
                    reviews={reviews}
                    currentRestaurants={restaurantData.size === 0 ? currentRestaurants : restaurantData}
                    onRefresh={onRefresh}
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
