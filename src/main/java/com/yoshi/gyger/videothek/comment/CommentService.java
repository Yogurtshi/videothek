package com.yoshi.gyger.videothek.comment;

import com.yoshi.gyger.videothek.base.MessageResponse;
import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaService;
import com.yoshi.gyger.videothek.storage.EntityNotFoundException;

import com.yoshi.gyger.videothek.storage.UnauthorizedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MediaService mediaService;

    public CommentService(CommentRepository commentRepository, MediaService mediaService) {
        this.commentRepository = commentRepository;
        this.mediaService = mediaService;
    }

    public List<Comment> getCommentsByMedia(Long mediaId) {
        return commentRepository.findByMediaId(mediaId);
    }

    public Comment insertComment(Long mediaId, CommentDTO commentDTO) {
        Media media = mediaService.getMedia(mediaId);

        Jwt jwt = (Jwt) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String username = jwt.getClaimAsString("preferred_username");

        Comment comment = new Comment();
        comment.setCommentText(commentDTO.getCommentText());
        comment.setUsername(username);
        comment.setMedia(media);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, CommentDTO commentDTO) {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String username = jwt.getClaimAsString("preferred_username");

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, Comment.class));

        if (!comment.getUsername().equals(username)) {
            throw new UnauthorizedException("You are not the creator of this comment");
        }

        comment.setCommentText(commentDTO.getCommentText());
        return commentRepository.save(comment);
    }

    public MessageResponse deleteComment(Long id) {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        String username = jwt.getClaimAsString("preferred_username");

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, Comment.class));

        if (!comment.getUsername().equals(username)) {
            throw new UnauthorizedException("You are not the creator of this comment");
        }

        commentRepository.delete(comment);
        return new MessageResponse("Comment " + id + " deleted");
    }
}