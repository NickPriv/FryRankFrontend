package com.fryrank.dal;

import com.fryrank.model.Review;

import java.util.List;

public interface ReviewDAL {

    List<Review> getAllReviewsByRestaurantId(String restaurantId);

    Review addNewReview(Review review);
}
