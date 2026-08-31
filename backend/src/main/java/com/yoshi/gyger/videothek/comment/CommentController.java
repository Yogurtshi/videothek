package com.yoshi.gyger.videothek.comment;

import com.yoshi.gyger.videothek.base.MessageResponse;
import com.yoshi.gyger.videothek.security.Roles;

import com.yoshi.gyger.videothek.storage.UnauthorizedException;
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

import java.util.List;

@RestController
@SecurityRequirement(name = "bearerAuth")
@Validated
@Tag(name = "Comments", description = "Comment management")
public class CommentController {

    private final CommentService commentService;

    CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // GET COMMENT BY MEDIA ID
    @GetMapping("/api/media/{mediaId}/comments")
    @RolesAllowed(Roles.Read)
    @Operation(summary = "Get all comments for a media",
            description = "Return list of all comments for the given media ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comments returned successfully"),
            @ApiResponse(responseCode = "404", description = "Media not found"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long mediaId) {
        try {
            return ResponseEntity.ok(commentService.getCommentsByMedia(mediaId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST COMMENT BY MEDIA ID
    @PostMapping("/api/media/{mediaId}/comments")
    @RolesAllowed(Roles.Read)
    @Operation(summary = "Add Comment", description = "Add a comment to a media")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Comment created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "404", description = "Media not found")
    })
    public ResponseEntity<Comment> addComment(
            @PathVariable Long mediaId,
            @Valid @RequestBody CommentDTO commentDTO) {
        try {
            Comment saved = commentService.insertComment(mediaId, commentDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATE COMMENT BY ID
    @PutMapping("/api/comments/{id}")
    @RolesAllowed(Roles.Update)
    @Operation(summary = "Update comment", description = "Update comment by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comment updated successfully"),
            @ApiResponse(responseCode = "403", description = "Not the creator of this comment"),
            @ApiResponse(responseCode = "404", description = "Comment not found")
    })
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentDTO commentDTO) {
        try {
            return ResponseEntity.ok(commentService.updateComment(id, commentDTO));
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 404
        }
    }

    // DELETE COMMENT BY ID
    @DeleteMapping("/api/comments/{id}")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Delete comment", description = "Delete a comment by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comment deleted successfully"),
            @ApiResponse(responseCode = "403", description = "Not the creator of this comment"),
            @ApiResponse(responseCode = "404", description = "Comment not found")
    })
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(commentService.deleteComment(id));
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 404
        }
    }


}