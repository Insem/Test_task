FROM node:18.12.1-alpine

WORKDIR /opt/app
COPY ./app .
RUN npm install -g typescript
RUN npm install -g knex
RUN npm install
RUN npm i -g @digitak/esrun

CMD ["./docker-entrypoint.sh"]