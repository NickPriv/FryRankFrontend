package com.fryrank.dal;

import com.fryrank.model.Review;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewDALImpl implements ReviewDAL {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Review> getAllReviewsByRestaurantId(@NonNull final String restaurantId) {
        final Query query = new Query();
        query.addCriteria(Criteria.where("restaurantId").is(restaurantId));
        return mongoTemplate.find(query, Review.class);
    }

    @Override
    public Review addNewReview(@NonNull final Review review) {
        mongoTemplate.save(review);
        return review;
    }
}
