# Bun公式イメージを使用
FROM oven/bun:latest

#  platform=linux/amd64 でビルド
FROM --platform=linux/amd64 oven/bun:1 
# Macの場合はコメントアウト

# 作業ディレクトリ
WORKDIR /app

# package.jsonをコピー
COPY package.json .

# 依存関係をインストール
RUN bun install

# アプリをビルド（必要なら）
RUN bun add -d bun-types
RUN bun update hono
RUN bun add -d typescript

# ソースコードをコピー
COPY . .

# Prismaの生成を修正
RUN bunx prisma generate --no-engine && \
    rm -rf node_modules/.prisma/client && \
    bunx prisma generate

# アプリを実行
CMD ["bun", "run", "--hot", "src/server.ts"]

EXPOSE 3001