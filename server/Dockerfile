FROM node:8

WORKDIR /app

COPY ./ /app

RUN npm install

RUN npm run build

CMD npm run prod
