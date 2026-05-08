package com.yoshi.gyger.videothek;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yoshi.gyger.videothek.media.Media;
import com.yoshi.gyger.videothek.media.MediaCategory;
import com.yoshi.gyger.videothek.media.MediaRepository;
import com.yoshi.gyger.videothek.media.MediaType;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
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

    private Long createdMediaId;

    @BeforeAll
    void setup() {
        mediaRepository.save(new Media(
                null, "Inception", "Dream heist movie",
                "Christopher Nolan", 2010, 148, null, MediaCategory.MOVIE));

        mediaRepository.save(new Media(
                null, "Dark", "Time travel mystery",
                "Baran bo Odar", 2017, 50, 26, MediaCategory.SERIES));
    }

    // READ ALL
    @Test
    @Order(1)
    void testGetAllMedia() throws Exception {
        String accessToken = obtainAccessToken("user", "user");

        api.perform(get("/api/media")
                        .header("Authorization", "Bearer " + accessToken)
                        .with(csrf()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Inception")));
    }

    // CREATE
    @Test
    @Order(2)
    void testCreateMedia() throws Exception {
        Media media = new Media();
        media.setTitle("Test Movie " + new Date().getTime());
        media.setDescription("Created in REST test");
        media.setDirector("Test Director");
        media.setReleaseYear(2024);
        media.setLength(120);
        media.setEpisodeCount(null);
        media.setMediaType(MediaType.MOVIE);

        String accessToken = obtainAccessToken("admin", "admin");
        String body = new ObjectMapper().writeValueAsString(media);

        String response = api.perform(post("/api/media")
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .content(body)
                        .header("Authorization", "Bearer " + accessToken)
                        .with(csrf()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Created in REST test")))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Media saved = new ObjectMapper().readValue(response, Media.class);
        createdMediaId = saved.getId();
    }

    // READ ONE
    @Test
    @Order(3)
    void testGetMediaById() throws Exception {
        String accessToken = obtainAccessToken("user", "user");

        api.perform(get("/api/media/" + createdMediaId)
                        .header("Authorization", "Bearer " + accessToken)
                        .with(csrf()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Created in REST test")));
    }

    // UPDATE
    @Test
    @Order(4)
    void testUpdateMedia() throws Exception {
        Media media = new Media();
        media.setTitle("Updated Test Movie");
        media.setDescription("Updated description");
        media.setDirector("Updated Director");
        media.setReleaseYear(2025);
        media.setLength(130);
        media.setEpisodeCount(null);
        media.setMediaType(MediaType.MOVIE);

        String accessToken = obtainAccessToken("admin", "admin");
        String body = new ObjectMapper().writeValueAsString(media);

        api.perform(put("/api/media/" + createdMediaId)
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .content(body)
                        .header("Authorization", "Bearer " + accessToken)
                        .with(csrf()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Updated Test Movie")));
    }

    // DELETE
    @Test
    @Order(5)
    void testDeleteMedia() throws Exception {
        String accessToken = obtainAccessToken("admin", "admin");

        api.perform(delete("/api/media/" + createdMediaId)
                        .header("Authorization", "Bearer " + accessToken)
                        .with(csrf()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("deleted")));
    }

    private String obtainAccessToken(String username, String password) {
        RestTemplate rest = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);

        String body = "client_id=videothek&" +
                "grant_type=password&" +
                "scope=openid profile roles offline_access&" +
                "username=" + username + "&" +
                "password=" + password;

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> resp = rest.postForEntity(
                "http://localhost:8080/realms/videothek/protocol/openid-connect/token",
                entity, String.class);

        JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resp.getBody()).get("access_token").toString();
    }
}