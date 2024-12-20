##
# Build
#

FROM node:20-alpine AS builder

COPY ./model/package.json ./model/package-lock.json* ./model/
RUN cd ./model && npm ci

COPY ./api/package.json ./api/package-lock.json* ./api/
RUN cd ./api && npm ci

COPY ./app/package.json ./app/package-lock.json* ./app/
RUN cd ./app && npm ci && npm install sharp

COPY ./model ./model
COPY ./api ./api
COPY ./app ./app

RUN cd ./api && npm run gen:prisma && npm run build && npm run gen:client
RUN cd ./app && npm run build

##
# Release
#

FROM alpine AS runner
WORKDIR /app

RUN apk add --no-cache nodejs

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD [ "node", "server.js" ]
