FROM node:14-alpine
# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN ["npm", "install"]

COPY . .

ENV NODE_PATH=./build

RUN ["npm", "run", "build"]

WORKDIR /app/build

CMD ["node", "app.js"]