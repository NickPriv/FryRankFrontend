package com.fryrank.dal;

import com.fryrank.model.Restaurant;

import java.util.List;

public interface RestaurantDAL {
    List<Restaurant> getAllRestaurants();

    Restaurant getRestaurantById(final String restaurantId);

    Restaurant addNewRestaurant(final Restaurant restaurant);
}
