FROM alpine:latest
WORKDIR /usr/src/app

COPY writer.js package*.json ./

RUN apk add nodejs
RUN apk add npm
RUN npm install

EXPOSE 8080
<<<<<<< HEAD
CMD ["npm", "start", "--"]
=======
CMD ["npm", "start"]
>>>>>>> 3b7fa091a6d31822c46363c40fd41d06166072ba
