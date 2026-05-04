package com.yoshi.gyger.videothek.movie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Movie {

    @Id
    @GeneratedValue
    private Long id;


    @Column(nullable = false)
    @Size(max = 255)
    @NotEmpty
    private String title;

    @Column(nullable = false)
    @Size(max = 255)
    @NotEmpty
    private String director;


    @Column(nullable = false)
    @NotEmpty
    private Integer length;

    public Movie(){}

    public Movie(Long id, String title, String director, Integer length){
        this.id = id;
        this.title = title;
        this.director = director;
        this.length = length;
    }
}
