FROM node:8

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

COPY ./ /app

RUN npm run build

CMD npm run prod
