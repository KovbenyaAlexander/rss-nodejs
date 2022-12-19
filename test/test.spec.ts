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
