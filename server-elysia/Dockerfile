FROM docker.io/oven/bun

WORKDIR /app

ARG NODE_ENV=production
ARG PORT=5111
ARG PG_URL
ARG COMMIT_SHA

ENV NODE_ENV $NODE_ENV
ENV PG_URL $PG_URL
ENV PORT $PORT
ENV COMMIT_SHA $COMMIT_SHA

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY tsconfig.json .
CMD ["bun", "src/index.ts"]

EXPOSE PORT
