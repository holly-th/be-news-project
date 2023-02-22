\c nc_news_test
INSERT INTO comments ( author, body, article_id) VALUES('butter_bridge', 'who is Mich?', 3) RETURNING * ;