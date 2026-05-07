package com.yoshi.gyger.videothek.media;

import com.yoshi.gyger.videothek.security.Roles;
import com.yoshi.gyger.videothek.base.MessageResponse;

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
public class MediaController {

    private final MediaService mediaService;

    MediaController(MediaService mediaService){this.mediaService = mediaService;}

    @Tag(name = "Media", description="Get Media")
    @Operation(summary = "Get all media", description = "Return list of all medias")
    @GetMapping
    @RolesAllowed(Roles.Read)
    public ResponseEntity<List<Media>> all()
    {
        List<Media> result = mediaService.getMedias();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Tag(name = "Media", description="Get Media")
    @Operation(summary = "Get a media", description = "Return media by ID")
    @GetMapping("/{id}")
    @RolesAllowed(Roles.Read)
    public ResponseEntity<Media> one(@PathVariable Long id) {
        Media media = mediaService.getMedia(id);
        return new ResponseEntity<>(media, HttpStatus.OK);
    }

    @Tag(name = "Media", description="Post Media")
    @Operation(summary = "Get all media", description = "Return list of all medias")
    @PostMapping
    @RolesAllowed(Roles.Admin)
    public ResponseEntity<Media> newMedia(@Valid @RequestBody Media media) {
        Media savedMedia = mediaService.insertMedia(media);
        return new ResponseEntity<>(savedMedia, HttpStatus.OK);
    }

    @Tag(name = "Media", description="Get Media")
    @Operation(summary = "Get all media", description = "Return list of all medias")
    @PutMapping("/{id}")
    @RolesAllowed(Roles.Admin)
    public ResponseEntity<Media> updateMedia(@Valid @RequestBody Media media, @PathVariable Long id) {
        Media savedMedia = mediaService.updateMedia(media, id);
        return new ResponseEntity<>(savedMedia, HttpStatus.OK);
    }

    @Tag(name = "Media", description="Get Media")
    @Operation(summary = "Get all media", description = "Return list of all medias")
    @DeleteMapping("/{id}")
    @RolesAllowed(Roles.Admin)
    public ResponseEntity<MessageResponse> deleteMedia(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mediaService.deleteMedia(id));
        } catch (Throwable t) {
            return ResponseEntity.internalServerError().build();
        }

}}
