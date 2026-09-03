# Videothek TODO

## Done

- [x] Scaffold Angular frontend with routing, standalone components, and SCSS
- [x] Add Angular Material/CDK and base styling
- [x] Configure frontend/backend URLs and Keycloak environment settings
- [x] Add OAuth2/OIDC login, logout, token storage, JWT decoding, and silent refresh
- [x] Add authentication guard and role-based `appIsInRoles` directive
- [x] Define TypeScript models for media, categories, comments, ratings, and admin statistics
- [x] Implement `MediaService`, `CommentService`, `RatingService`, and `AdminService`
- [x] Build the media list page with Material cards and edit/delete action wiring
- [x] Build the media detail page shell with media, comments, and average-rating loading
- [x] Build the admin dashboard shell with statistics loading
- [x] Wire lazy routes, navigation, and role-based admin visibility
- [x] Add initial component and service test files
- [x] Add basic `frontend/README.md` with development, build, and test commands

## Still To Do

- [ ] Add JWT auth and global error HTTP interceptors
- [ ] Add client-side media filter/search
- [ ] Implement the media create/edit form and validators matching backend constraints
- [ ] Add the `/media/:id/edit` route and connect it to the existing edit action
- [ ] Complete media detail interactions: comment create/edit/delete and rating widget
- [ ] Enforce comment ownership in the UI: edit by owner, delete by admin
- [ ] Implement one-rating-per-user UX and duplicate-rating error handling
- [ ] Complete the admin dashboard with stats cards plus media/comments tables and actions
- [ ] Add explicit loading, empty, and error states to every API-backed page
- [ ] Complete responsive/mobile styling and test the main flows at narrow widths
- [ ] Fix incorrect model imports in the existing service specs
- [ ] Expand component and service tests for success, error, role, ownership, and form-validation paths
- [ ] Run manual QA for anonymous, read, update, and admin users
- [ ] Document frontend authentication, backend prerequisites, and role-based run instructions

## Verification

- [ ] Run `npm run build` from `frontend/`
- [ ] Run the relevant `npm test` checks from `frontend/`
- [ ] Run the relevant Maven tests from `backend/`
