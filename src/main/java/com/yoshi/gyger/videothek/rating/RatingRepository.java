package com.yoshi.gyger.videothek.rating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByMediaIdAndUsername(Long mediaId, String username);

    @Query("SELECT AVG(r.score) FROM Rating r WHERE r.media.id = :mediaId")
    Optional<Double> findAverageScoreByMediaId(@Param("mediaId") Long mediaId);
}