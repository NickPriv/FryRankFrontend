package com.fryrank.model;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("review")
@RequiredArgsConstructor
@Data
public class Review {

    @Id
    private final String reviewId;

    @NonNull
    private final String restaurantId;

    @NonNull
    private final String authorId;

    @NonNull
    private final Double score;

    @NonNull
    private final String title;

    @NonNull
    private final String body;

}
