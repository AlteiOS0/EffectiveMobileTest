FROM node:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

CMD ["sh", "-c" ,"npm run prisma:deploy && npm run start"]