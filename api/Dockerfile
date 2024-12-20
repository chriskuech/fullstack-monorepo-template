
##
# Build
#

FROM node:20-alpine AS builder

COPY ./model/package.json ./model/package-lock.json* ./model/
RUN cd ./model && npm ci

COPY ./api/package.json ./api/package-lock.json* ./api/
RUN cd ./api && npm ci

COPY ./model ./model
COPY ./api ./api

RUN cd ./api && npm run gen:prisma
RUN cd ./api && npm run lint && npm run check

RUN cd ./api && npm run build 


##
# Release
#

FROM node:20-alpine AS runner

RUN apk add --no-cache poppler-utils weasyprint ttf-dejavu

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

WORKDIR /app

COPY --from=builder --chown=api:nodejs /api/package.json /api/package-lock.json* ./
RUN npm ci --include prod

COPY --from=builder --chown=api:nodejs /api/prisma ./prisma/
RUN npm run gen:prisma

COPY --from=builder --chown=api:nodejs /api/dist ./dist/

RUN ls -R ./dist/

USER api

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
