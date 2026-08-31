TODO Checklist

    Scaffold frontend/ Angular project with routing + SCSS

    Add UI library (Angular Material or PrimeNG) and base theme

    Configure environments (apiBaseUrl, Keycloak realm/client)

    Integrate keycloak-angular, app initializer, login/logout flow

    Build JWT authInterceptor and errorInterceptor

    Build authGuard with role checks (admin, read, update)

    Define TS models for Media, Comment, Rating, AdminDTO

    Implement MediaService, CommentService, RatingService, AdminService

    Build Media List page + client-side filter/search

    Build Media Modal (create/edit form with validators matching backend constraints)

    Build Media Detail page (comments + rating widget)

    Implement comment ownership rules in UI (edit=owner, delete=admin)

    Implement one-rating-per-user UX handling

    Build Admin Dashboard (stats cards + media/comments tables)

    Wire up routing, nav bar, role-based visibility

    Add loading/empty/error states everywhere

    Responsive/mobile pass

    Write component + service tests

    Manual QA per role (anonymous / read / admin)

    Write frontend/README.md with run instructions