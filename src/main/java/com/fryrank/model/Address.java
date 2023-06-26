package com.fryrank.model;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
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
