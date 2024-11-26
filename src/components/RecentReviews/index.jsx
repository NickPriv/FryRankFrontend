import { useState, useEffect } from 'react';
import { fetchTopReviews, fetchRestaurantDetails } from './proxy';
import { FrySpinner, ReviewCardList } from '../Common';

const RecentReviews = () => {
    const [recentReviews, setRecentReviews] = useState([]);
    const [restaurantData, setRestaurantData] = useState(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviews = await fetchTopReviews();
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

export default RecentReviews;