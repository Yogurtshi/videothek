package com.yoshi.gyger.videothek;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaCategory;
import com.yoshi.gyger.videothek.media.MediaRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.AutoConfigureDataJpa;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@AutoConfigureMockMvc
@AutoConfigureDataJpa
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MediaControllerTests {

    @Autowired
    private MockMvc api;

    @Autowired
    private MediaRepository mediaRepository;

    @BeforeAll
    void setup() {
    this.mediaRepository.save(new Media(
            null,
            "District 9",
            "Movie about dude getting turned into Bugman",
            "Some Guy",
            2010,
            68,
            1,
            MediaCategory.MOVIE));

        this.mediaRepository.save(new Media(
                null,
                "Stranger Things",
                "Series about some kids killing monsters",
                "Probably some DND nerd",
                2019,
                200,
                20,
                MediaCategory.SERIES));
    }


    @Test
    @Order(1)
    void testGetMedia() throws Exception {

        String accessToken = obtainAccessToken();

        api.perform(get("/api/media").header("Authorization", "Bearer " + accessToken)
                        .with(csrf()))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Stranger Things")));
    }

    @Test
    @Order(2)
    void testSaveMedia() throws Exception{
        Media media = new Media();

        media.setTitle("TEST TITLE");
        media.setDescription("TEST DESC");
        media.setDirector("TEST DIRECTOR");
        media.setReleaseYear(2002);
        media.setLength(68);
        media.setEpisodeCount(1);
        media.setMediaCategory(MediaCategory.MOVIE);

        String accessToken = obtainAccessToken();
        String body = new ObjectMapper().writeValueAsString(media);

        api.perform(post("/api/media")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body)
                        .header("Authorization", "Bearer " + accessToken)
                        .with(csrf()))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("TEST TITLE")));
    }

    @Test
    @Order(3)
    void testDeleteMedia() throws Exception {
        Media media = this.mediaRepository.save(new Media(
                null,
                "DELETE TEST",
                "Will be deleted",
                "TEST DIRECTOR",
                2020,
                120,
                1,
                MediaCategory.MOVIE
        ));

        Long id = media.getId();
        String accessToken = obtainAccessToken();

        api.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                        .delete("/api/media/" + id)
                        .with(csrf())
                        .header("Authorization", "Bearer " + accessToken))
                .andDo(print())
                .andExpect(status().isOk());

        org.junit.jupiter.api.Assertions.assertFalse(
                mediaRepository.findById(id).isPresent()
        );
    }

    @Test
    @Order(4)
    void testUpdateMedia() throws Exception {
        Media media = this.mediaRepository.save(new Media(
                null,
                "UPDATE TEST",
                "Will be updated",
                "TEST DIRECTOR",
                2020,
                120,
                1,
                MediaCategory.MOVIE
        ));

        Long id = media.getId();

        // Geänderte Werte
        media.setTitle("UPDATED TITLE");
        media.setDescription("UPDATED DESC");

        String accessToken = obtainAccessToken();
        String body = new ObjectMapper().writeValueAsString(media);

        api.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                        .put("/api/media/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body)
                        .with(csrf())
                        .header("Authorization", "Bearer " + accessToken))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("UPDATED TITLE")));
    }

    private String obtainAccessToken() {

        RestTemplate rest = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "client_id=videothek&" +
                "grant_type=password&" +
                "scope=openid profile roles offline_access&" +
                "username=admin&" +
                "password=admin";

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> resp = rest.postForEntity("http://localhost:8080/realms/Videothek/protocol/openid-connect/token", entity, String.class);

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resp.getBody()).get("access_token").toString();
    }

}

