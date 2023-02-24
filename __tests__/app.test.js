const request = require("supertest");
const app = require("../db/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");
require("jest-sorted");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET/api/topics", () => {
  test("200: returns an array of topic objects with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.results).toBeInstanceOf(Array);
      });
  });
  test("200: the returning array is made up of objects and each one has a slug and description keys ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const results = body.results;
        expect(results).toHaveLength(3);
        results.forEach((object) => {
          expect(object).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});
describe("GET/api/articles", () => {
  test("200: returns an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.results).toBeInstanceOf(Array);
      });
  });
  test("200: returns an array of article objects where each object has all the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articleArr = body.results;
        expect(articleArr).toHaveLength(12);
        articleArr.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("200: the array of objects are ordered by date created decending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.results).toBeSortedBy("created_at", { descending: true });
      });
  });
  describe("GET /api/articles(queries => topic, sort_by order)", () => {
    test("200: returns the correct articles when provided with a topic query", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          expect(body.results).toHaveLength(1);
          const article = body.results[0];
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: "cats",
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
    });
    test("404: returns a not found error when passed a topic that doesn't exist in the articles table", () => {
      return request(app)
        .get("/api/articles?topic=dogs")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
    test("200: returns the articles sorted by the spcified column", () => {
      return request(app)
        .get("/api/articles?sortby=author")
        .expect(200)
        .then(({ body }) => {
          expect(body.results).toBeInstanceOf(Object);
          expect(body.results).toBeSortedBy("author", { descending: true });
        });
    });
  });
  describe("GET/api/articles/:article_id", () => {
    test("200: returns an object with the correct article matching the id passed in", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
          const article = body.article[0];
          expect(body.article).toHaveLength(1);
          expect(article.article_id).toBe(3);
        });
    });
    test("404: returns a error and message when passed a valid but non-exisitant id", () => {
      return request(app)
        .get("/api/articles/100")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
    test("400: returns error and message when passed an invalid id type", () => {
      return request(app)
        .get("/api/articles/abc")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
  });
  describe("GET/api/articles/:article_id/comments", () => {
    test("200: returns an array of comment objects relating to article_id given", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          expect(body.comments).toHaveLength(2);
          comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
            });
            expect(comment.article_id).toBe(3);
          });
        });
    });
    test("404: returns correct error and message when passed a valid but non-existant id", () => {
      return request(app)
        .get("/api/articles/300/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
    test("400: returns error and message when passed an invalid id ", () => {
      return request(app)
        .get("/api/articles/abc/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("200: the comments are presented with the most recent comment first", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });
  });

  describe("POST/api/articles/:article_id/comments", () => {
    test("201: returns the comment that was just posted to the correct article_id given", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "butter_bridge", body: "who is Mitch?" })
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(201)
        .then(({ body }) => {
          const addedComment = body.newComment[0];
          expect(addedComment).toMatchObject({
            author: "butter_bridge",
            body: "who is Mitch?",
            article_id: 3,
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
    });
    test("201: tests that when adding a new comment the function will ignore any extra properties it doesn't need", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "butter_bridge", body: "who is Mitch?", votes: 11 })
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(201)
        .then(({ body }) => {
          const addedComment = body.newComment[0];
          expect(addedComment).toMatchObject({
            author: "butter_bridge",
            body: "who is Mitch?",
            article_id: 3,
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
    });
    test("400: returns a bad request error when the information needed to add a new comment is incomplete", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "butter_bridge" })
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("400: returns a bad request error when passed an invalid article_id type", () => {
      return request(app)
        .post("/api/articles/abc/comments")
        .send({ username: "butter_bridge", body: "who is mitch?" })
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("404: returns an Not found error when passed a valid but non-existant article_id", () => {
      return request(app)
        .post("/api/articles/10000/comments")
        .send({ username: "butter_bridge", body: "who is mitch?" })
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
    test("404: returns Not found error when passed a username that doesn't exisit in the database aka non-existant", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "holl", body: "who is mitch?" })
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
  });

  describe("PATCH/api/articles/:article_id", () => {
    test("200: returns updated article using the correct article_id", () => {
      return request(app)
        .patch("/api/articles/3")
        .send({ inc_votes: 5 })
        .expect(200)
        .then(({ body }) => {
          const updatedArticle = body.changedArticle[0];
          expect(updatedArticle).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 3,
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: 5,
            article_img_url: expect.any(String),
          });
        });
    });
    test("400: returns a bad request error if the necessary data is not provided ", () => {
      return request(app)
        .patch("/api/articles/3")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("404: returns a not found error wheen passed an valid but non- existant article_id", () => {
      return request(app)
        .patch("/api/articles/100")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
    test("400: returns bad request when passed an article_id of the wrong datatype", () => {
      return request(app)
        .patch("/api/articles/abc")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
    test("400: returns a bad request error when passed an increase count value of wrong datatype", () => {
      return request(app)
        .patch("/api/articles/3")
        .send({ inc_votes: "hello" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad Request");
        });
    });
  });
});
