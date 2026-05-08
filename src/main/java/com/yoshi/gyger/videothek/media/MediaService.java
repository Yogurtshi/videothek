package com.yoshi.gyger.videothek.media;

import com.yoshi.gyger.videothek.base.MessageResponse;
import com.yoshi.gyger.videothek.storage.EntityNotFoundException;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository){this.mediaRepository = mediaRepository;}

    public List<Media> getMedias(){return mediaRepository.findAll();}

    public Media getMedia(@NonNull Long id) {
        return mediaRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException(id, Media.class));
    }

    public Media insertMedia(Media media) {
        return mediaRepository.save(media);
    }

    public Media updateMedia(Media media, Long id) {
        return mediaRepository.findById(id)
                .map(mediaOrig -> {
                    mediaOrig.setTitle(media.getTitle());
                    mediaOrig.setDescription(media.getDescription());
                    mediaOrig.setDirector(media.getDirector());
                    mediaOrig.setReleaseYear(media.getReleaseYear());
                    mediaOrig.setLength(media.getLength());
                    mediaOrig.setEpisodeCount(media.getEpisodeCount());
                    mediaOrig.setMediaCategory(media.getMediaCategory());
                    return mediaRepository.save(mediaOrig);
                })
                .orElseGet(() -> mediaRepository.save(media));
    }

    public MessageResponse deleteMedia(Long id) {
        mediaRepository.deleteById(id);
        return new MessageResponse("Media " + id + " deleted");
    }


}
