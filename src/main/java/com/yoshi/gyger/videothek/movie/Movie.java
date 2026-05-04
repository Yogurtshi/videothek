package com.yoshi.gyger.videothek.movie;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Movie {

    @Id
    @GeneratedValue
    private Long id;



}
