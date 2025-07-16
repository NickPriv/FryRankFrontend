import { BACKEND_SERVICE_PATH } from '../../constants';
import { GOOGLE_API_PATH, HEADER_CONTENT_TYPE, HEADER_API_KEY, HEADER_FIELD_MASK } from '../../redux/sagas/restaurants';

export const reviewCount = 10;

export const fetchRecentReviews = async (count = reviewCount) => {
    const response = await fetch(`${BACKEND_SERVICE_PATH}/reviews/recent?count=${count}`);
    const newData = await response.json();
    return newData.reviews;
};

export const fetchRestaurantDetails = async (restaurantIds) => {
    const promises = restaurantIds.map(async (id) => {
        const response = await fetch(GOOGLE_API_PATH + "places/" +`${id}`, {
            headers: {
                [HEADER_CONTENT_TYPE] : 'application/json',
                [HEADER_API_KEY]: process.env.REACT_APP_GOOGLE_API_KEY,
                [HEADER_FIELD_MASK]: 'id,displayName,formattedAddress',
            },
        });
        return response.json();
    });

    const results = await Promise.all(promises);
    return results;
};