package com.yoshi.gyger.videothek.comment;

import com.yoshi.gyger.videothek.media.Media;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 1000)
    @Column(nullable = false, length = 1000)
    private String commentText;

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

    public Comment() {}

    public Comment(String commentText, Media media) {
        this.commentText = commentText;
        this.media = media;
    }
}