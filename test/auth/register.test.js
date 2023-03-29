import TestHelpers from "../test-helpers";
import models from "../../src/database/models";
import request from "supertest";

describe("register", () => {
  let app;

  beforeAll(async () => {
    await TestHelpers.startDb();
    app = TestHelpers.getApp();
  });

  afterAll(async () => {
    await TestHelpers.stopDb();
  });

  beforeEach(async () => {
    await TestHelpers.syncDb();
  });

  it("should register a new user succesfully", async () => {
    const data = {
      email: "test@example.com",
      password: "Test123#",
      username: "test",
      role: "guest",
    };
    const response = await request(app)
      .post("/api/v1/users")
      .send(data)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.message).toEqual("Usuario registrado con éxito");
    const { User, RefreshToken } = models;
    const users = await User.findAll({ include: [RefreshToken] });
    expect(users.length).toEqual(1);
    const newUser = users[0];
    expect(newUser.email).toEqual(data.email);
    expect(newUser.username).toEqual(data.username);
    expect(newUser.password).toBeUndefined();
    expect(newUser.role).toEqual(data.role);
    expect(newUser.RefreshToken.token).toEqual(expect.any(String));
  });

  it("should not create a new user if it already exists", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        email: "test@example.com",
        password: "Test123#",
        username: "testuser",
      })
      .expect(200);
    const response = await request(app)
      .post("/api/v1/users")
      .send({
        email: "test@example.com",
        password: "Test123#",
        username: "testuser",
      })
      .expect(200);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual("Usuario ya existe");
  });
});
