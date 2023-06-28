package com.fryrank.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("restaurant")
@Data
public class Restaurant {
    @Id
    private final String id;

    @NonNull
    private final String name;

    @NonNull
    private final Address address;
}
