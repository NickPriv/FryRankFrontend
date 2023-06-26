package com.fryrank.dal;

import com.fryrank.model.Review;

import java.util.List;

public interface ReviewDAL {

    List<Review> getAllReviewsByRestaurantId(final String restaurantId);

    Review addNewReview(final Review review);
}
