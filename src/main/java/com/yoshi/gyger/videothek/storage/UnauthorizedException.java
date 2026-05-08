package com.yoshi.gyger.videothek.storage;


// MESSAGE CAN BE ADDED WHY EXATLY THE USER ISN'T AUTHERIZED
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}