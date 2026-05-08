package com.yoshi.gyger.videothek.rating;

import com.yoshi.gyger.videothek.security.Roles;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    // POST RATING BY MEDIA ID
    @PostMapping("/api/media/{mediaId}/ratings")
    @RolesAllowed({Roles.Read, Roles.Admin})
    @Operation(summary = "Rate a media",
            description = "Score between 1 and 10. Each user can only rate once per media.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Rating created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid score or user has already rated this media"),
            @ApiResponse(responseCode = "404", description = "Media not found"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<Rating> addRating(
            @PathVariable Long mediaId,
            @Valid @RequestBody RatingDTO request) {
        try {
            Rating saved = ratingService.insertRating(mediaId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalStateException e) {
            // User hat bereits bewertet
            return ResponseEntity.badRequest().build(); // 400
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 404
        }
    }

    // GET RATING AVERAGE BY MEDIA ID
    @GetMapping("/api/media/{mediaId}/ratings/average")
    @RolesAllowed(Roles.Read)
    @Operation(summary = "Get average rating for a media")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Average rating returned"),
            @ApiResponse(responseCode = "404", description = "Media not found"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<Double> getAverageRating(@PathVariable Long mediaId) {
        try {
            return ResponseEntity.ok(ratingService.getAverageRating(mediaId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 404
        }
    }
}