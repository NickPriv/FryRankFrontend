import { useState, useEffect, useCallback } from 'react';
import { fetchTopReviews, fetchRestaurantDetails } from '../../containers/RecentReviews';
import { FrySpinner, ReviewCardList, Banner } from '../Common';

const RecentReviews = () => {
    const [recentReviews, setRecentReviews] = useState();
    const [restaurantData, setRestaurantData] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            const reviews = await fetchTopReviews();
            setRecentReviews(reviews);
        } catch (error) {
            setError(error.message);
        }
    },[]);

    useEffect(()=>{
        fetchReviews();
    }, [fetchReviews]);

    useEffect(() => {
        if (recentReviews) {
            const restaurantIds = Array.from(new Set(recentReviews.map(review => review.restaurantId)));
            const fetchDetails = async () => {
                const details = await fetchRestaurantDetails(restaurantIds);
                let restaurantDict = new Map();
                details.forEach(detail => {
                    restaurantDict.set(detail.id, detail);
                });

                setRestaurantData(restaurantDict);
                setLoading(false);
            };

            fetchDetails();
        }
    }, [recentReviews]);

    if (loading) {
        return <FrySpinner />;
    } else if (recentReviews.length === 0) {
        return <Banner type="error" message={error} />;
    }

    return (
        <div>
            <h1>Recent Reviews</h1>
            <ReviewCardList
                reviews={recentReviews}
                currentRestaurants={restaurantData} // Pass the restaurantMap to the ReviewCardList
                onRefresh={fetchReviews}
            />
        </div>
    );
};

export default RecentReviews;
