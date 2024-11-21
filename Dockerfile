FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run","dev:docker"]