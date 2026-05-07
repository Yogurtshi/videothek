# Videothek – ToDo

## 1. Projektstruktur auf Media umstellen
- [x] `movie` Package in `media` umbenennen
- [x] `Movie` in `Media` umbenennen
- [x] `MovieController` in `MediaController` umbenennen
- [x] `MovieService` in `MediaService` umbenennen
- [x] `MovieRepository` in `MediaRepository` umbenennen
- [x] Endpoint von `/api/movie` auf `/api/media` ändern

## 2. Media-Entity fertig machen
- [x] Felder ergänzen: `title`, `description`, `director`, `releaseYear`, `length`, `episodeCount`, `type`
- [x] Enum `MediaType` erstellen mit `MOVIE` und `SERIES`
- [x] Validierungen korrigieren (`@NotNull`, `@Positive`, `@NotBlank` statt falscher `@NotEmpty` Nutzung bei Zahlen)
- [x] Prüfen, ob `episodeCount` optional sein soll

## 3. Media CRUD fertig machen
- [x] `GET /api/media`
- [x] `GET /api/media/{id}`
- [x] `POST /api/media`
- [x] `PUT /api/media/{id}`
- [x] `DELETE /api/media/{id}`

## 4. Suchfunktion einbauen
- [ ] Suche nach `title`
- [ ] Filter nach `releaseYear`
- [ ] Filter nach `lengthCategory`
- [ ] Enum `LengthCategory` erstellen (`SHORT`, `MEDIUM`, `LONG`)
- [ ] Search-Endpoint erstellen: `GET /api/media/search`
- [ ] `MediaRepository` auf `JpaSpecificationExecutor` erweitern
- [ ] `MediaSpecification` für dynamische Filter erstellen

## 5. Comment-Bereich bauen
- [x] `Comment` Entity erstellen
- [x] `CommentRepository` erstellen
- [x] `CommentService` erstellen
- [x] `CommentController` erstellen
- [x] `GET /api/media/{mediaId}/comments`
- [x] `POST /api/media/{mediaId}/comments`
- [x] `DELETE /api/comments/{id}`

## 6. Rating-Bereich bauen
- [ ] `Rating` Entity erstellen
- [ ] `RatingRepository` erstellen
- [ ] `RatingService` erstellen
- [ ] `RatingController` erstellen
- [ ] `POST /api/media/{mediaId}/ratings`
- [ ] `GET /api/media/{mediaId}/ratings/average`
- [ ] Sicherstellen, dass ein User pro Medium nur eine Bewertung abgeben kann

## 7. Admin-Bereich bauen
- [ ] `AdminController` erstellen
- [ ] Admin-Dashboard-Endpunkt erstellen
- [ ] Endpunkt für Kommentar-Moderation ergänzen
- [ ] Endpunkt für Übersicht aller Medien ergänzen

## 8. Security mit Keycloak/Bearer Token fertig machen
- [ ] Prüfen, welche Rollen im JWT ankommen
- [ ] `AuthenticationRoleConverter` korrigieren
- [ ] Rollen sauber auf `ROLE_USER` und `ROLE_ADMIN` mappen
- [ ] Geschützte Endpunkte mit Rollen absichern
- [ ] Bearer Token in Swagger testen
- [ ] Prüfen, ob User und Admin unterschiedliche Rechte haben

## 9. Swagger/OpenAPI aufräumen
- [ ] Doppelte Swagger/OpenAPI-Konfiguration bereinigen
- [ ] Alle Endpunkte mit `@Operation` dokumentieren
- [ ] Wichtige Responses mit `@ApiResponse` dokumentieren
- [ ] Security-Schema für Bearer Token korrekt verwenden

## 10. Fehlerbehandlung ergänzen
- [ ] Globalen `@RestControllerAdvice` erstellen
- [ ] `EntityNotFoundException` sauber als 404 zurückgeben
- [ ] Validierungsfehler sauber als JSON zurückgeben
- [ ] Einheitliches Fehlerformat definieren

## 11. Tests ergänzen
- [ ] Controller-Tests für `MediaController`
- [ ] Controller-Tests für `CommentController`
- [ ] Controller-Tests für `RatingController`
- [ ] Service-Tests für `MediaService`
- [ ] Tests für Suchfunktion
- [ ] Security-Tests für Admin/User-Rechte

## 12. Projektdoku fertig machen
- [ ] README aufräumen
- [ ] API-Beschreibung ergänzen
- [ ] ERM erstellen
- [ ] UML-Klassendiagramm erstellen
- [ ] Projektbeschreibung für die Abgabe schreiben
- [ ] PDF für die Projektabnahme erstellen