FROM node:20.18.0

WORKDIR /app


COPY package*.json ./

RUN npm install



RUN npx prisma generate

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]