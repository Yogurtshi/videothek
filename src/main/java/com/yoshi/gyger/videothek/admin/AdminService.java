package com.yoshi.gyger.videothek.admin;

import com.yoshi.gyger.videothek.base.MessageResponse;
import com.yoshi.gyger.videothek.comment.Comment;
import com.yoshi.gyger.videothek.comment.CommentRepository;
import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaRepository;
import com.yoshi.gyger.videothek.rating.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final MediaRepository mediaRepository;
    private final CommentRepository commentRepository;
    private final RatingRepository ratingRepository;

    public AdminService(MediaRepository mediaRepository,
                        CommentRepository commentRepository,
                        RatingRepository ratingRepository) {
        this.mediaRepository = mediaRepository;
        this.commentRepository = commentRepository;
        this.ratingRepository = ratingRepository;
    }

    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public MessageResponse deleteComment(Long id){
        commentRepository.deleteById(id);
        return new MessageResponse("Comment " + id + " deleted");
    }

    public AdminDTO getStats() {
        return new AdminDTO(
                mediaRepository.count(),
                commentRepository.count(),
                ratingRepository.count()
        );
    }
}