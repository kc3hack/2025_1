# Bun公式イメージを使用
FROM oven/bun:latest

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

# Prismaの生成をビルド時に実行
RUN bunx prisma generate

# アプリを実行
CMD ["bun", "run", "--hot", "src/server.ts"]

EXPOSE 3001