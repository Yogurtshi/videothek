package com.yoshi.gyger.videothek.media;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.Data;

@Data
@Entity
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String title;

    @Size(max = 2000)
    @Column(length = 2000)
    private String description;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String director;

    @NotNull
    @Min(1888)
    @Max(2100)
    @Column(nullable = false)
    private Integer releaseYear;

    @Positive
    @Column(nullable = false)
    private Integer length;

    @Min(1)
    @Column
    private Integer episodeCount;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MediaType mediaType;

    public Media() {
    }

    public Media(Long id, String title, String description, String director,
                 Integer releaseYear, Integer length, Integer episodeCount, MediaType mediaType) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.director = director;
        this.releaseYear = releaseYear;
        this.length = length;
        this.episodeCount = episodeCount;
        this.mediaType = mediaType;
    }
}