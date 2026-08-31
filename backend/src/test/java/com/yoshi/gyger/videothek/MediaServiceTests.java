package com.yoshi.gyger.videothek;
import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaRepository;
import com.yoshi.gyger.videothek.media.MediaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class MediaServiceTests {

    private MediaService mediaService;
    private final MediaRepository mediaRepositoryMock = mock(MediaRepository.class);

    private final Media mediaMock = mock(Media.class);

    @BeforeEach
    void setup(){
        mediaService = new MediaService(mediaRepositoryMock);
    }

    @Test
    void createMedia(){
        when(mediaRepositoryMock.save(mediaMock)).thenReturn(mediaMock);
        mediaService.insertMedia(mediaMock);
        verify(mediaRepositoryMock, times(1)).save(any());
    }

    @Test
    void findMedia() {
        when(mediaRepositoryMock.findById(1L)).thenReturn(Optional.ofNullable(mediaMock));
        Media m = mediaService.getMedia(1L);
        verify(mediaRepositoryMock, times(1)).findById(1L);
    }

    @Test
    void deleteMedia() {
        mediaService.deleteMedia(1L);
        verify(mediaRepositoryMock, times(1)).deleteById(1L);
    }


}
