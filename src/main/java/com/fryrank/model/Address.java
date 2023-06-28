package com.fryrank.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class Address {
    @NonNull
    private final String streetNumberAndName;

    @NonNull
    private final String city;

    @NonNull
    private final String stateAbbr;

    @NonNull
    private final String zipCode;
}
