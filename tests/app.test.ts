import supertest, { agent } from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/database";
import testFactory from "./factories/testFactory";
import tokenFactory from "./factories/tokenFactory";
import userFactory from "./factories/userFactory";
const userData = userFactory();

describe("POST /signup && /signin", () => {
  it("create user", async () => {
    const response = await supertest(app)
      .post("/signup")
      .send({ ...userData, confirmPassword: userData.password });
    expect(response.status).toBe(201);
    const createdUser = await prisma.user.findFirst({
      where: { email: userData.email },
    });
    expect(createdUser).not.toBeNull();
  });
  it("try to create user with repeated email", async () => {
    const response = await supertest(app)
      .post("/signup")
      .send({ ...userData, confirmPassword: userData.password });
    expect(response.status).toBe(409);
  });
  it("login with valid credentials", async () => {
    const response = await supertest(app).post("/signin").send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
  it("try to signin with wrong credentials", async () => {
    const response = await supertest(app)
      .post("/signin")
      .send({ ...userData, password: "123" });
    expect(response.status).toBe(401);
  });
});

describe("POST /tests", () => {
  it("try to create test with valid body", async () => {
    const token = await tokenFactory();
    const test = testFactory();
    const response = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    const createdTest = await prisma.test.findFirst({
      where: { name: test.name },
    });
    expect(createdTest).not.toBeNull();
  });
  it("try to create test with invalid token", async () => {
    const test = testFactory();
    const response = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer invalid token`);
    expect(response.status).toBe(401);
  });
  it("try to create test with discipline that is not in database", async () => {
    const token = await tokenFactory();
    const test = testFactory();
    const response = await supertest(app)
      .post("/tests")
      .send({ ...test, discipline: "invalid discipline" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
  it("try to create test with category that is not in database", async () => {
    const token = await tokenFactory();
    const test = testFactory();
    const response = await supertest(app)
      .post("/tests")
      .send({ ...test, category: "invalid category" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
  it("try to create test with teacher that is not in database", async () => {
    const token = await tokenFactory();
    const test = testFactory();
    const response = await supertest(app)
      .post("/tests")
      .send({ ...test, teacher: "invalid teacher" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});

describe("GET /tests", () => {
  it("get tests by disciplines", async () => {
    const token = await tokenFactory();
    const response = await supertest(app)
      .get("/tests?groupBy=disciplines")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);
  });
  it("get tests by teachers", async () => {
    const token = await tokenFactory();
    const response = await supertest(app)
      .get("/tests?groupBy=teachers")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);
  });
  it("get tests by wrong clause", async () => {
    const token = await tokenFactory();
    const response = await supertest(app)
      .get("/tests")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
  it("get tests with wrong token", async () => {
    const response = await supertest(app)
      .get("/tests?groupBy=teachers")
      .set("Authorization", `Bearer invalid token`);
    expect(response.status).toBe(401);
  });
});
afterAll(async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE users`,
    prisma.$executeRaw`TRUNCATE TABLE categories CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE disciplines CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE terms CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE teachers CASCADE`,
  ]);
  await prisma.$disconnect();
});
