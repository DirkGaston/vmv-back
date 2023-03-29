import TestHelpers from "../test-helpers";
import models from "../../src/database/models";
import request from "supertest";

describe("login", () => {
  let app;
  let newUserResponse;

  beforeAll(async () => {
    await TestHelpers.startDb();
    app = TestHelpers.getApp();
  });

  afterAll(async () => {
    await TestHelpers.stopDb();
  });

  beforeEach(async () => {
    await TestHelpers.syncDb();
    newUserResponse = await TestHelpers.registerNewUser({
      email: "test@example.com",
      password: "Test123#",
      username: "testuser",
    });
  });

  it("should login a user succesfully", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "Test123#" })
      .expect(200);
    const refreshToken = response.body.data.refreshToken;
    expect(refreshToken).toEqual(newUserResponse.body.data.refreshToken);
  });

  it("should return 401 if we pass an email that is not associated with any user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.net", password: "Test123#" })
      .expect(401);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual("Credenciales no válidas");
  });

  it("should return 401 if we pass an invalid password", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "invalidpassword" })
      .expect(401);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual("Credenciales no válidas");
  });

  it("should create a new refresh token record if there is not one associated with the user", async () => {
    const { RefreshToken } = models;
    await RefreshToken.destroy({ where: {} });
    let refreshTokensCount = await RefreshToken.count();
    expect(refreshTokensCount).toEqual(0);
    await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "Test123#" })
      .expect(200);
    refreshTokensCount = await RefreshToken.count();
    expect(refreshTokensCount).toEqual(1);
  });

  it("should set the token field to a JWT if this field is empty", async () => {
    const { RefreshToken } = models;
    const refreshToken = newUserResponse.body.data.refreshToken;
    const savedRefreshToken = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    savedRefreshToken.save();
    await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "Test123#" })
      .expect(200);
    await savedRefreshToken.reload();
    expect(savedRefreshToken.token).not.toBeNull();
  });
});
