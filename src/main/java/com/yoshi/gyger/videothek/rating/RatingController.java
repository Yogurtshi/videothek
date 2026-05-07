package com.yoshi.gyger.videothek.rating;

import com.yoshi.gyger.videothek.security.Roles;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@SecurityRequirement(name = "bearerAuth")
@Validated
@Tag(name = "Ratings", description = "Rating management")
public class RatingController {

    private final RatingService ratingService;

    RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/api/media/{mediaId}/ratings")
    @RolesAllowed({Roles.Read, Roles.Admin})
    @Operation(summary = "Rate a media", description = "Score between 1 and 10. Each user can only rate once per media.")
    public ResponseEntity<Rating> addRating(
            @PathVariable Long mediaId,
            @Valid @RequestBody RatingDTO request) {
        Rating saved = ratingService.insertRating(mediaId, request);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/api/media/{mediaId}/ratings/average")
    @RolesAllowed(Roles.Read)
    @Operation(summary = "Get average rating for a media")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long mediaId) {
        return ResponseEntity.ok(ratingService.getAverageRating(mediaId));
    }
}