package com.yoshi.gyger.videothek.rating;

import com.yoshi.gyger.videothek.media.Media;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"media_id", "username"})
)
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(1)
    @Max(10)
    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false, updatable = false, length = 255)
    private String username;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "media_id", nullable = false)
    private Media media;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Rating() {}
}