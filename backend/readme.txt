docker compose build #1番初めにやる
docker compose up -d #コンテナを立てるときにやる
docker compose down  #コンテナを閉じるときにやる
docker exec -it {コンテナ名} bash -p #起動したコンテナにログイン
mysql -u root -p -h 127.0.0.1 #MySQLを起動