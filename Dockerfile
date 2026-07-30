FROM node:22-alpine

WORKDIR /app

COPY frontend/package*.json ./frontend/

WORKDIR /app/frontend
RUN npm install

COPY frontend/ .

RUN npm run build

ENV PORT=10000
EXPOSE 10000

CMD ["npm", "run", "start"]