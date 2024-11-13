// api.js
export const fetchTopReviews = async (count = 5) => {
    const response = await fetch(`http://localhost:8080/api/reviews/top?count=${count}`);
    const newData = await response.json();
    return newData.reviews;
};
