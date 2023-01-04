FROM node:18-alpine

ENV PORT=3000

RUN apk add --no-cache git bash python3 make g++

COPY . /app
WORKDIR /app

RUN yarn install --prod
RUN yarn build
RUN yarn global add pm2

EXPOSE $PORT

CMD [ "pm2-runtime", "start", "/app/ecosystem.config.js" ]
