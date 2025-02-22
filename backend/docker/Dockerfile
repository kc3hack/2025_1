# Bun公式イメージを使用
FROM oven/bun:1

#  platform=linux/amd64 でビルド
FROM --platform=linux/amd64 oven/bun:1 
# Macの場合はコメントアウト

# 作業ディレクトリ
WORKDIR /app

# 依存関係をコピー
ADD ../package.json ../bun.lock ./
RUN bun install
RUN bun add -d bun-types
RUN bun update hono
RUN bun add -d typescript

# アプリコードをコピー
COPY . .

# MySQLクライアントとnetcatをインストール
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    netcat-traditional \
    nodejs \
    npm

# Node.js と npm のインストール
RUN apt-get update && apt-get install -y nodejs npm

# アプリをビルド（必要なら）
RUN npm install -g typescript

# アプリを実行
CMD ["bun", "run", "dev"]

EXPOSE 3001