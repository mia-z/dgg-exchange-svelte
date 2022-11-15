FROM node:18.11-alpine

USER node

EXPOSE 3000

WORKDIR /app

COPY . .

ENTRYPOINT [ "yarn", "vite", "dev" ]