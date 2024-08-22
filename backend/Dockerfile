FROM node:lts-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY .env.example .env
COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
