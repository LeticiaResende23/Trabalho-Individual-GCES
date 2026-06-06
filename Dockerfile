FROM node:20-bookworm-slim

WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server/ ./
COPY game/ /app/game/

EXPOSE 55555

CMD ["npm", "run", "dev"]