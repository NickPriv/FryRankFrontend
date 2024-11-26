// api.js
const GOOGLE_API_PATH = "https://places.googleapis.com/v1/";
const HEADER_CONTENT_TYPE = 'Content-Type';
const HEADER_API_KEY = 'X-Goog-Api-Key';
const HEADER_FIELD_MASK = 'X-Goog-FieldMask';

export const fetchTopReviews = async (count = 5) => {
    const response = await fetch(`http://localhost:8080/api/reviews/top?count=${count}`);
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