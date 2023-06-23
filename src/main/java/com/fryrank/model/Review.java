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
    private String reviewId;

    @NonNull @Getter
    private String restaurantId;

    @NonNull @Getter
    private String authorId;

    @NonNull @Getter
    private Double score;

    @NonNull @Getter
    private String title;

    @NonNull @Getter
    private String body;

}
