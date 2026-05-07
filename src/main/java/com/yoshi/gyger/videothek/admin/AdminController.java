package com.yoshi.gyger.videothek.admin;

import com.yoshi.gyger.videothek.base.MessageResponse;
import com.yoshi.gyger.videothek.comment.Comment;
import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.security.Roles;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@SecurityRequirement(name = "bearerAuth")
@Validated
@Tag(name = "Admin", description = "Admin endpoints")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/media")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Get all media for admin")
    public ResponseEntity<List<Media>> getAllMedia() {
        return new ResponseEntity<>(adminService.getAllMedia(), HttpStatus.OK);
    }

    @GetMapping("/comments")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Get all comments for admin")
    public ResponseEntity<List<Comment>> getAllComments() {
        return new ResponseEntity<>(adminService.getAllComments(), HttpStatus.OK);
    }


    @DeleteMapping("/comments/{id}")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Delete comment",
            description = "Delete a comment by ID (no username check)")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.deleteComment(id));
    }

    @GetMapping("/stats")
    @RolesAllowed(Roles.Admin)
    @Operation(summary = "Get admin dashboard statistics")
    public ResponseEntity<AdminDTO> getStats() {
        return new ResponseEntity<>(adminService.getStats(), HttpStatus.OK);
    }


}