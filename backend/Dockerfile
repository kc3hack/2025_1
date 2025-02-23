FROM node:20-slim

WORKDIR /app

# OpenSSLのみインストール
RUN apt-get update -y && \
    apt-get install -y openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"] 