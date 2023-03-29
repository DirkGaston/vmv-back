import TestHelpers from "../test-helpers";
import models from "../../src/database/models";
import request from "supertest";
import JWTUtils from "../utils/jwt-utils.test";

describe("logout", () => {
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
    });
  });

  describe("requiresAuth middleware", () => {
    it("should fail if the refresh token is invalid", async () => {
      const response = await request(app)
        .post("/api/v1/auth/logout")
        .set("Authorization", "Bearer invalidtoken")
        .send()
        .expect(401);
      expect(response.body.success).toEqual(false);
      expect(response.body.message).toEqual("Token no válido");
    });
  });

  it("should logout a user succesfully", async () => {
    const accessToken = newUserResponse.body.data.accessToken;
    const response = await request(app)
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`)
      .send()
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual("Log out con éxito");
    const { User, RefreshToken } = models;
    const user = await User.findOne({
      where: { email: "test@example.com" },
      include: RefreshToken,
    });
    expect(user.RefreshToken.token).toBeNull();
  });
});
