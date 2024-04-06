# Build static web files
FROM docker.io/oven/bun as builder

WORKDIR /web

ARG COMMIT_SHA

ENV NODE_ENV development
ENV COMMIT_SHA $COMMIT_SHA

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY index.html .

RUN bun run build

# Web server image
FROM nginx:alpine

COPY docker-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /dist /usr/share/nginx/html

EXPOSE 80
