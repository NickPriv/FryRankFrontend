package com.fryrank.dal;

import com.fryrank.model.Restaurant;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
        final Optional<Restaurant> restaurant = Optional.ofNullable(mongoTemplate.findById(restaurantId, Restaurant.class));
        return restaurant.orElseThrow(() -> new NullPointerException(String.format("A restaurant does not exist for the requested ID %s.", restaurantId)));
    }

    @Override
    public Restaurant addNewRestaurant(@NonNull final Restaurant restaurant) {
        mongoTemplate.save(restaurant);
        return restaurant;
    }

}
