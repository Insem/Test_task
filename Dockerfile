FROM node:18.12.1-alpine

WORKDIR /opt/app
COPY ./app .
RUN npm install -g typescript
RUN npm install -g knex
RUN npm install
RUN tsc --strict true index.ts

CMD ["./docker-entrypoint.sh"]
EXPOSE 8080