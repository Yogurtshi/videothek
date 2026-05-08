package com.yoshi.gyger.videothek.storage;


// RETURNS STRING IF A USER ALREADY RATED A MEDIA
public class DuplicateRatingException extends RuntimeException {

    public DuplicateRatingException(String username, Long mediaId) {
        super("User '" + username + "' has already rated media " + mediaId);
    }
}