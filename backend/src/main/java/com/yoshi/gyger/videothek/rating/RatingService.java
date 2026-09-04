package com.yoshi.gyger.videothek.rating;

import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaService;
import com.yoshi.gyger.videothek.storage.DuplicateRatingException;
import com.yoshi.gyger.videothek.storage.EntityNotFoundException;
import com.yoshi.gyger.videothek.storage.UnauthorizedException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final MediaService mediaService;

    public RatingService(RatingRepository ratingRepository, MediaService mediaService) {
        this.ratingRepository = ratingRepository;
        this.mediaService = mediaService;
    }

    public Rating insertRating(Long mediaId, RatingDTO ratingDTO) {

        // CHECKS WITH THE TOKEN PREFERRED_USERNAME IF THE USER ALREADY RATED
        Jwt jwt = (Jwt) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String username = jwt.getClaimAsString("preferred_username");

        ratingRepository.findByMediaIdAndUsername(mediaId, username)
                .ifPresent(r -> {
                    throw new DuplicateRatingException(username, mediaId);
                });

        Media media = mediaService.getMedia(mediaId);

        Rating rating = new Rating();
        rating.setScore(ratingDTO.getScore());
        rating.setUsername(username);
        rating.setMedia(media);

        return ratingRepository.save(rating);
    }

    public Double getAverageRating(Long mediaId) {
        mediaService.getMedia(mediaId);
        return ratingRepository.findAverageScoreByMediaId(mediaId)
                .orElse(0.0);
    }

    public Rating getRatingForUser(Long mediaId) {
        return ratingRepository.findByMediaIdAndUsername(mediaId, currentUsername())
                .orElseThrow(() -> new EntityNotFoundException(mediaId, Rating.class));
    }

    public Rating updateRating(Long id, RatingDTO ratingDTO) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, Rating.class));

        if (!rating.getUsername().equals(currentUsername())) {
            throw new UnauthorizedException("You are not the creator of this rating");
        }

        rating.setScore(ratingDTO.getScore());
        return ratingRepository.save(rating);
    }

    private String currentUsername() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwt.getClaimAsString("preferred_username");
    }
}