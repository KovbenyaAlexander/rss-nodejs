import supertest from "supertest";
import { app } from "../src/index";

const testApi = supertest(app);
const LINK = "/api/users";

describe("Test scenario 1", () => {
  const newUser = {
    username: "1233113",
    age: 25,
    hobbies: ["js"],
  };

  let userId: string;

  it("Should get an empty db", async () => {
    const response = await testApi.get(LINK);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual("[]");
  });

  it("should add user", async () => {
    const response = await testApi.post(LINK).set("Content-Type", "application/json").send(JSON.stringify(newUser));
    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);

    expect(body.age).toBe(newUser.age);
    expect(body.username).toBe(newUser.username);
    expect(body.hobbies).toStrictEqual(newUser.hobbies);

    userId = body.id;
  });

  it("Should get user", async () => {
    const response = await testApi.get(`${LINK}/${userId}`);
    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    const { id, ...user } = body;
    expect(newUser).toStrictEqual(user);
  });

  it("Should update username", async () => {
    const userUpdate = { username: "new name" };

    const response = await testApi.put(`${LINK}/${userId}`).send(JSON.stringify(userUpdate));

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    const { username, id } = body;

    expect(username).toBe(userUpdate.username);
    expect(userId).toBe(id);
  });

  it("Should remove the user", async () => {
    const response = await testApi.delete(`${LINK}/${userId}`);
    expect(response.statusCode).toBe(204);
  });

  it("Should get an empty db", async () => {
    const response = await testApi.get(LINK);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual("[]");
  });
});

describe("Test scenario 2", () => {
  it("Should get status 400 if userId is not valid - GET", async () => {
    const response = await testApi.get(`${LINK}/wrong_id`);
    expect(response.statusCode).toBe(400);
  });

  it("Should get status 400 if user is not valid - POST", async () => {
    const response = await testApi.post(LINK).send(JSON.stringify({ a: "a" }));
    expect(response.statusCode).toBe(400);
  });

  it("Should get status 400 if user is not valid - PUT", async () => {
    const response = await testApi.put(LINK).send(JSON.stringify({ a: "a" }));
    expect(response.statusCode).toBe(400);
  });

  it("Should get status 400 if userId is not valid - DELETE", async () => {
    const response = await testApi.delete(`${LINK}/wrong_userid`);
    expect(response.statusCode).toBe(400);
  });

  it("Should get status 404 if user not found - DELETE", async () => {
    const response = await testApi.delete(`${LINK}/11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000`);
    expect(response.statusCode).toBe(404);
  });
});
