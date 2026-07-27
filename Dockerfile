FROM node:22

WORKDIR /app

# Copy everything
COPY . .

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install
RUN npm run build

EXPOSE 10000

ENV PORT=10000

CMD ["npm", "run", "start"]