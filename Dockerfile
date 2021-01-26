FROM node:lts-alpine AS shorten-url-frontend 

COPY frontend frontend

WORKDIR frontend

RUN npm install && \
  npm run build

FROM node:11-alpine

ENV APP_DIR=/root/url-shorten-service

COPY . ${APP_DIR}

WORKDIR ${APP_DIR}

COPY --from=shorten-url-frontend /dist ${APP_DIR}/dist

RUN rm -rf ${APP_DIR}/frontend \
  && npm install \
  && npm run build \
  && mv dist build/dist

EXPOSE 3000

CMD [ "npm", "run", "prod" ];
