package com.yoshi.gyger.videothek.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminDTO {
    private long mediaCount;
    private long commentCount;
    private long ratingCount;
}