FROM alpine:latest
WORKDIR /usr/src/app

COPY monitor.js package*.json ./

RUN apk add nodejs
RUN apk add npm
RUN npm install

EXPOSE 8080
CMD ["npm", "start", "--"]
