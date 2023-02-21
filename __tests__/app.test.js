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
        articleArr.forEach((article) => {
          const keys = Object.keys(article);
          expect(keys).toHaveLength(9);
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
          expect(body.message).toBe("ID not found");
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
  describe("POST/api/articles/:article_id/comments", () => {
    // test("200: returns the comment that was just posted to the correct article_id given", () => {
    //   return request(app)
    //     .post("/api/articles/3/comments")
    //     .send({ username: "butter_bridge", body: "who is Mitch?" })
    //     .set("Accept", "application/json")
    //     .expect("Content-type", /json/)
    //     .expect(201)
    //     .then(({ body }) => {
    //       console.log(body);
    //       expect(body.comment).toEqual({
    //         username: "butter_bridge",
    //         body: "who is Mich",
    //       });
    // });
    // });
  });
});
