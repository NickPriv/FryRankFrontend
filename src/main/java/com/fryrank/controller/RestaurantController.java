package com.fryrank.controller;

import com.fryrank.dal.RestaurantDAL;
import com.fryrank.model.Restaurant;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController {
    @Autowired
    private RestaurantDAL restaurantDAL;

    @GetMapping(value = "/restaurants")
    public List<Restaurant> getAllRestaurants() {
        return restaurantDAL.getAllRestaurants();
    }

    @PostMapping(value = "/restaurants")
    public Restaurant addNewRestaurant(@RequestBody @NonNull final Restaurant restaurant) {
        return restaurantDAL.addNewRestaurant(restaurant);
    }
}
