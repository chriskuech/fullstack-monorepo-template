
# Full-Stack Monorepo Template

This repo is a template for a strongly typed full-stack monorepo with NextJS.

The template provides the architecture for--
* Using `next` with a separate API, idiomatically leveraging `next`'s native `fetch` integration to cache API calls.
* Using `prisma`, `fastify` + `zod`, and `openapi-typescript` to statically type from the database to the front-end.
* Creating a minimalist 3-tier architecture, like NestJS but without the boilerplate and maximalism.
  * Dependency Injection without the complexity of a full-blown DI framework.
    * Using `async_hooks` to create request-scoped "services".
    * Using closures to create singleton "services".
  * Using `fastify` to mimic `nestjs` controllers but with the minimalism of `express`.

## Frameworks

* `zod` - minimalist but full-powered validation library used wherever possible, especially at the API layer
* `fastify` - like `express`, but with `zod` validation and type safety
* `prisma` - ORM with a minimalist schema modeling language, easy-to-use migrations, and type generation
* `next` - React framework providing front-end architecture, caching, authentication, etc., but with limitations for server-side code
* `openapi-typescript` - generates typescript types for a OpenAPI specs derived from our `fastify` API
* `fetch` - integrates with `nextjs` to cache API calls
* PostgreSQL - the best database for `prisma`


## Projects

See the READMEs in each project for more information.

- [API](./api/README.md) - backend called by the app
- [App](./app/README.md) - nextjs app


## Setup

### Prereqs

- NVM
- VS Code (Install all recommended extensions)


### Running the system

0. Run `nvm use --lts` to use a consistent node version.
1. In `app` and `api`, create a .env file matching the schemas in src/config.ts.
2. In `app` and `api`, run `npm install`.
3. In `api`, run `npx prisma migrate reset` to reset the db.
4. In `api`, run `npm run gen`.
5. In `api`, run `docker compose up`.
6. In `app` and `api`, run `npm run dev`.
