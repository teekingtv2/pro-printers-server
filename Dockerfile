FROM node:alpine

RUN npm install -g nodemon

WORKDIR /boderless/backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]