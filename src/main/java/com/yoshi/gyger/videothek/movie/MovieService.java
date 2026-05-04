package com.yoshi.gyger.videothek.movie;

import com.yoshi.gyger.videothek.storage.EntityNotFoundException;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository repository;

    public MovieService(MovieRepository repository){this.repository = repository;}

    public List<Movie> getMovies(){return repository.findAll();}

    public Movie getMovie(@NonNull Long id) {
        return repository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException(id, Movie.class));
    }
}
