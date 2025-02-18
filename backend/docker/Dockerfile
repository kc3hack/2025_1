# Bun公式イメージを使用
FROM oven/bun:1

# 作業ディレクトリ
WORKDIR /app

# 依存関係をコピー
ADD ../package.json ../bun.lock ./
RUN bun install
RUN bun update hono
# アプリコードをコピー
COPY . .

# アプリをビルド（必要なら）
RUN bun run build

# アプリを実行
CMD ["bun", "run", "dev"]
