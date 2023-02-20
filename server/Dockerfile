FROM node:16.17-alpine

WORKDIR /

COPY package*.json ./

COPY . .

RUN npm install --only=production


EXPOSE 9000

CMD [ "node", "server.js" ]
