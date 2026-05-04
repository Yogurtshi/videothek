package com.yoshi.gyger.videothek.movie;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {

    private final MovieService movieService;

    MovieController(MovieService movieService){this.movieService = movieService;}

    @Tag(name = "Movie", description="Get Movie")
    @Operation(summary = "Get all Movies", description = "Return list of all Movies")
    @GetMapping("api/movie")
    public ResponseEntity<List<Movie>> all()
    {
        List<Movie> result = movieService.getMovies();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
