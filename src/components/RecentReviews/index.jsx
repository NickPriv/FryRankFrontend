import { useState, useEffect } from 'react';
import { fetchTopReviews, fetchRestaurantDetails } from './proxy';
import { FrySpinner, ReviewCardList } from '../Common';
import { connect } from 'react-redux';
import { restaurantsActions } from '../../redux/reducers/restaurants/index';

const mapStateToProps = (state) => ({
    restaurantMap: state.restaurantsReducer.currentRestaurants, // Correctly map from the Redux state
    restaurantsError: state.restaurantsReducer.restaurantsError,
});

const mapDispatchToProps = {
    getRestaurantsForIds: restaurantsActions.startGetRestaurantsForIdsRequest,
};

const RecentReviews = ({ restaurantMap, getRestaurantsForIds }) => {
    const [recentReviews, setRecentReviews] = useState([]);
    const [restaurantData, setRestaurantData] = useState(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviews = await fetchTopReviews();
            console.log(reviews);
            setRecentReviews(reviews);
           
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        if (recentReviews && recentReviews.length > 0) {
            const restaurantIds = Array.from(new Set(recentReviews.map(review => review.restaurantId)));
            
            const fetchDetails= async()=>{
                const details= await fetchRestaurantDetails(restaurantIds);

                let restaurantDict=new Map();
                
                details.forEach(detail=>{
                    restaurantDict.set(detail.id,detail);
                });

                setRestaurantData(restaurantDict);
                setLoading(false);
            };

            fetchDetails();
        }
    }, [recentReviews]);

    if (loading) {
        return <p><FrySpinner /></p>;
    } else if (recentReviews.length === 0) {
        return <p>Sorry, no reviews published yet.</p>;
    }
 
    return (
        <div>
            
            <h1>Recent Reviews</h1>
            <ReviewCardList
                reviews={recentReviews}
                currentRestaurants={restaurantData} // Pass the restaurantMap to the ReviewCardList
            />
        </div>
    );

};

export default connect(mapStateToProps, mapDispatchToProps)(RecentReviews);