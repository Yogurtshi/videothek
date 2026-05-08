package com.yoshi.gyger.videothek;


import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaRepository;
import com.yoshi.gyger.videothek.media.MediaCategory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@DataJpaTest()
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
class MediaRepositoryTest {

    @Autowired
    private MediaRepository mediaRepository;

    @Test
    void insertMedia() {
        Media movie = this.mediaRepository.save(new Media(
                null, "Inception", "Dream heist", "Nolan", 2010, 148, 1, MediaCategory.MOVIE));
        Assertions.assertNotNull(movie.getId());

        Media series = this.mediaRepository.save(new Media(
                null, "Stranger Things", "Monster kids", "Duffer Bros", 2016, 50, 34, MediaCategory.SERIES));
        Assertions.assertNotNull(series.getId());
    }

    @Test
    void findAllMedia() {
        List<Media> all = mediaRepository.findAll();
        assertFalse(all.isEmpty());
    }

    @Test
    void updateMedia() {
        Media saved = this.mediaRepository.save(new Media(
                null, "Old Title", "Old Desc", "Old Dir", 2000, 100, 1, MediaCategory.MOVIE));

        saved.setTitle("New Title");
        saved.setDescription("New Desc");
        Media updated = mediaRepository.save(saved);

        assertEquals("New Title", updated.getTitle());
        assertEquals("New Desc", updated.getDescription());
    }

    @Test
    void deleteMedia() {
        Media saved = this.mediaRepository.save(new Media(
                null, "Delete Me", "To be deleted", "Dir", 2022, 90, 1, MediaCategory.MOVIE));

        Long id = saved.getId();
        mediaRepository.deleteById(id);

        Optional<Media> deleted = mediaRepository.findById(id);
        assertFalse(deleted.isPresent());
    }
}
