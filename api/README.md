# Dev Setup

## Prereqs

- Docker
  - Enable `Host network mode` in Docker Desktop [see more](https://docs.docker.com/network/drivers/host/)

## Commands

| Command                    | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `docker compose up`        | Run dependencies.                                |
| `docker compose pull`      | Update dependencies.                             |
| `npx prisma migrate reset` | (Re-)initialize the db and seed it.              |
| `npx prisma generate`      | Generate new typings (without resetting the db). |
| `npx prisma migrate dev`   | Generate a new db migration and apply it.        |
| `npm run dev`              | Start the server in dev mode.                    |
