package com.fryrank.controller;

import com.fryrank.dal.ReviewDAL;
import com.fryrank.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {

    @Autowired
    private ReviewDAL reviewDAL;

    @GetMapping(value = "/reviews/")
    public List<Review> getAllReviewsForRestaurant(@RequestParam("restaurantId") final String restaurantId) {
        return reviewDAL.getAllReviewsByRestaurantId(restaurantId);
    }

    @PostMapping(value = "/reviews/")
    public Review addNewReviewForRestaurant(@RequestBody final Review review) {
        return reviewDAL.addNewReview(review);
    }
}
