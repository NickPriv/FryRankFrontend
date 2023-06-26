package com.fryrank.model;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("review")
@RequiredArgsConstructor
public class Review {

    @Id @Getter
    private final String reviewId;

    @NonNull @Getter
    private final String restaurantId;

    @NonNull @Getter
    private final String authorId;

    @NonNull @Getter
    private final Double score;

    @NonNull @Getter
    private final String title;

    @NonNull @Getter
    private final String body;

}
