package com.fryrank.dal;

import com.fryrank.model.Restaurant;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RestaurantDALImpl implements RestaurantDAL {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Restaurant> getAllRestaurants() {
        return mongoTemplate.findAll(Restaurant.class);
    }

    @Override
    public Restaurant getRestaurantById(@NonNull final String restaurantId) {
        return mongoTemplate.findById(restaurantId, Restaurant.class);
    }

    @Override
    public Restaurant addNewRestaurant(@NonNull final Restaurant restaurant) {
        mongoTemplate.save(restaurant);
        return restaurant;
    }

}
