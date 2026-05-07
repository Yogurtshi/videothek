package com.yoshi.gyger.videothek.comment;

import com.yoshi.gyger.videothek.base.MessageResponse;
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

    @GetMapping("/api/media/{mediaId}/comments")
    @RolesAllowed(Roles.Read)
    @Operation(summary = "Get all comments for a media",
            description = "Return list of all comments for the given media ID")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long mediaId) {
        List<Comment> result = commentService.getCommentsByMedia(mediaId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/api/media/{mediaId}/comments")
    @RolesAllowed(Roles.Read)
    @Operation(summary="Add Comment", description = "Add a comment to a media")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long mediaId,
            @Valid @RequestBody CommentDTO  commentDTO) {
        Comment saved = commentService.insertComment(mediaId, commentDTO);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @DeleteMapping("/api/comments/{id}")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Delete comment", description = "Delete a comment by ID")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.deleteComment(id));
    }

    @PutMapping("/api/comments/{id}")
    @RolesAllowed(Roles.Update)
    @Operation(summary = "Update comment", description = "Update comment by ID")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentDTO commentDTO) {
        Comment savedComment = commentService.updateComment(id, commentDTO);
        return new ResponseEntity<>(savedComment, HttpStatus.OK);
    }
}