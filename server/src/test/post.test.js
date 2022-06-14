const request = require("supertest");

const app = require("../../app");

describe("Post test", () => {
  test("GET /api/posts", (done) => {
    request(app)
      .get("/api/posts")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
