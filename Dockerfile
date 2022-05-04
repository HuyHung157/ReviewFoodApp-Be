FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# COPY ./config ./config

# COPY ./json ./json
COPY ./*.js ./*.js

COPY ./dist ./dist

COPY ./ormconfig.js ./ormconfig.js

CMD ["node", "dist/main"]