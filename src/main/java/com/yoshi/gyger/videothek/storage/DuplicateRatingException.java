package com.yoshi.gyger.videothek.storage;

public class DuplicateRatingException extends RuntimeException {

    public DuplicateRatingException(String username, Long mediaId) {
        super("User '" + username + "' has already rated media " + mediaId);
    }
}