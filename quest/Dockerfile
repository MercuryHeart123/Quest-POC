FROM node:16.9.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g nodemon
CMD [ "nodemon", "index.js" ]