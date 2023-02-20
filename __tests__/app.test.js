const request = require("supertest");
const app = require("../db/app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const data = require("../db/data/test-data");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("app/topics", () => {
  test("200: returns an array of topic objects with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        //  console.log(body);
        expect(body).toBeInstanceOf(Array);
      });
  });
  test("200: the returning array is made up of objects and each one has a slug and description keys ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.forEach((object) => {
          expect(object).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
          console.log(object);
        });
      });
  });
});
