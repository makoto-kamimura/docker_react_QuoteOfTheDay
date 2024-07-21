# ビルドステージ
FROM node:18 AS build

# 作業ディレクトリを作成
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 配信ステージ
FROM nginx:alpine

# Nginxのデフォルト設定を削除
RUN rm /etc/nginx/conf.d/default.conf

# Nginxの設定をコピー
COPY nginx.conf /etc/nginx/conf.d

# ビルド済みアプリケーションをNginxのディレクトリにコピー
COPY --from=build /app/build /usr/share/nginx/html

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]

# ポート80を公開
EXPOSE 80
