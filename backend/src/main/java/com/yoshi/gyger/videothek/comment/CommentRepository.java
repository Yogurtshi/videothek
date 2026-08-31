package com.yoshi.gyger.videothek.comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByMediaId(Long mediaId);
    Optional<Comment> findByIdAndUsername(Long id, String username);
}
