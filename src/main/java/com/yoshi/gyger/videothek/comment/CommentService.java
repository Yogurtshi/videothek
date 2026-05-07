package com.yoshi.gyger.videothek.comment;

import com.yoshi.gyger.videothek.base.MessageResponse;
import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaService;
import com.yoshi.gyger.videothek.storage.EntityNotFoundException;
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

    public List<Comment> getComments(){return commentRepository.findAll();}

    public List<Comment> getCommentsByMedia(Long mediaId) {
        return commentRepository.findByMediaId(mediaId);
    }

    public Comment insertComment(Long mediaId, Comment comment) {
        Media media = mediaService.getMedia(mediaId);
        comment.setMedia(media);
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment, Long id) {
        return commentRepository.findById(id)
                .map(commentOrig -> {
                    commentOrig.setCommentText(comment.getCommentText());
                    return commentRepository.save(commentOrig);
                })
                .orElseGet(() -> commentRepository.save(comment));
    }

    public MessageResponse deleteComment(Long id) {
        commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, Comment.class));
        commentRepository.deleteById(id);
        return new MessageResponse("Comment " + id + " deleted");
    }
}