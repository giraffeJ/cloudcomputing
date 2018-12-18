FROM alpine:latest
WORKDIR /usr/src/app

COPY writer.js package.json

RUN npm install

EXPOSE 8080
CMD ["npm", "start"]