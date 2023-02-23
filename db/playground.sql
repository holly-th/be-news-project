\c nc_news_test
UPDATE articles SET votes = votes $1 WHERE articles.article_id = $2 RETURNING *