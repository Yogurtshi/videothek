package com.yoshi.gyger.videothek.media;

import com.yoshi.gyger.videothek.security.Roles;
import com.yoshi.gyger.videothek.base.MessageResponse;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/media")
@SecurityRequirement(name = "bearerAuth")
@Validated
@Tag(name = "Media", description="Media management")
public class MediaController {

    private final MediaService mediaService;

    MediaController(MediaService mediaService){this.mediaService = mediaService;}

    // GET ALL
    @Operation(summary = "Get all media", description = "Return list of all medias")
    @GetMapping
    @RolesAllowed(Roles.Read)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of all media returned"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<Media>> all()
    {
        List<Media> result = mediaService.getMedias();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // GET BY ID
    @GetMapping("/{id}")
    @RolesAllowed(Roles.Read)
    @Operation(summary = "Get a media", description = "Return media by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Media found"),
            @ApiResponse(responseCode = "404", description = "Media not found")
    })
    public ResponseEntity<Media> one(@PathVariable Long id) {
        Media media = mediaService.getMedia(id);
        return new ResponseEntity<>(media, HttpStatus.OK);
    }

    // POST MEDIA
    @PostMapping
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Save media", description = "Save a media")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Media created"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<Media> newMedia(@Valid @RequestBody Media media) {
        Media savedMedia = mediaService.insertMedia(media);
        return new ResponseEntity<>(savedMedia, HttpStatus.OK);
    }

    // UPDATE MEDIA BY ID
    @PutMapping("/{id}")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Update media", description = "Update media by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Media updated"),
            @ApiResponse(responseCode = "404", description = "Media not found")
    })
    public ResponseEntity<Media> updateMedia(@Valid @RequestBody Media media, @PathVariable Long id) {
        Media savedMedia = mediaService.updateMedia(media, id);
        return new ResponseEntity<>(savedMedia, HttpStatus.OK);
    }

    // DELETE MEDIA BY ID
    @DeleteMapping("/{id}")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Delete media", description = "Deletes media by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Media deleted"),
            @ApiResponse(responseCode = "404", description = "Media not found")
    })
    public ResponseEntity<MessageResponse> deleteMedia(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mediaService.deleteMedia(id));
        } catch (Throwable t) {
            return ResponseEntity.internalServerError().build();
        }

}}
