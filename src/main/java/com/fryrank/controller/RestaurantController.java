package com.fryrank.controller;

import com.fryrank.dal.RestaurantDAL;
import com.fryrank.model.Restaurant;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController {

    private static final String RESTAURANTS_URI = "/restaurants";
    @Autowired
    private RestaurantDAL restaurantDAL;

    @GetMapping(value = RESTAURANTS_URI)
    public List<Restaurant> getAllRestaurants() {
        return restaurantDAL.getAllRestaurants();
    }

    @GetMapping(value = RESTAURANTS_URI, params = "restaurantId")
    public Restaurant getRestaurantById(@RequestParam("restaurantId") @NonNull final String restaurantId) {
        return restaurantDAL.getRestaurantById(restaurantId);
    }

    @PostMapping(value = RESTAURANTS_URI)
    public Restaurant addNewRestaurant(@RequestBody @NonNull final Restaurant restaurant) {
        return restaurantDAL.addNewRestaurant(restaurant);
    }
}
