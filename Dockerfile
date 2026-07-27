FROM node:22

WORKDIR /app

COPY . .

RUN npm install
RUN npm --prefix frontend install

EXPOSE 10000

CMD ["node", "backend/app.js"]