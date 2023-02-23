FROM node:14-alpine
WORKDIR /Docker-Demo

RUN yarn global add pm2

COPY --chown=node:node package.json ecosystem.config.js yarn.lock ./

RUN yarn install

COPY --chown=node:node . ./

EXPOSE 3000
