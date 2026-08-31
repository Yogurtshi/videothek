package com.yoshi.gyger.videothek.storage;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(Long id, Class c) {
        super("Could not find " + c.getSimpleName() + " " + id);
    }
}