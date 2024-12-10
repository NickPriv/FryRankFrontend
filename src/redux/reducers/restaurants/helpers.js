export const getPinData = (restaurantIds, currentRestaurants, aggregateReviewsData) => {
    return restaurantIds?.map(restaurantId => {
        return {
            key: restaurantId,
            location: {
                lat: currentRestaurants.get(restaurantId).location.latitude,
                lng: currentRestaurants.get(restaurantId).location.longitude
            },
            name: currentRestaurants.get(restaurantId).displayName.text,
            address: currentRestaurants.get(restaurantId).formattedAddress,
            score: aggregateReviewsData[restaurantId]?.avgScore
        };
    });
};