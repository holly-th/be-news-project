\c nc_news_test
ALTER comments WHERE comments.article_id = 3 ADD {username: "butter_bridge", body: "who is Mich"};
SELECT * FROM comments WHERE comments.body =  "who is Mich";