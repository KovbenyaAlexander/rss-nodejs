import supertest from "supertest";
import { app } from "../src/index";

const testApi = supertest(app);
const LINK = "/api/users";
const VALID_ID_EXAMPLE = "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000";

const newUser = {
  username: "1233113",
  age: 25,
  hobbies: ["js"],
};

describe("Test scenario 1", () => {
  let userId: string;

  it("Should get an empty db", async () => {
    const response = await testApi.get(LINK);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual("[]");
  });

  it("should add user", async () => {
    const response = await testApi.post(LINK).send(JSON.stringify(newUser));
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

  it("Should get status 400 if userId is not valid - PUT", async () => {
    const response = await testApi.put(`${LINK}/wrong_id`).send(JSON.stringify({ age: 111 }));
    expect(response.statusCode).toBe(400);
  });

  it("Should get status 404 if user not found - PUT", async () => {
    const response = await testApi.put(`${LINK}/${VALID_ID_EXAMPLE}`).send(JSON.stringify({ age: 111 }));
    expect(response.statusCode).toBe(404);
  });

  it("Should get status 400 if userId is not valid - DELETE", async () => {
    const response = await testApi.delete(`${LINK}/wrong_id`);
    expect(response.statusCode).toBe(400);
  });

  it("Should get status 404 if user not found - DELETE", async () => {
    const response = await testApi.delete(`${LINK}/${VALID_ID_EXAMPLE}`);
    expect(response.statusCode).toBe(404);
  });
});

describe("Test scenario 3", () => {
  const userIDs: string[] = [];

  it("Should get empty users arr", async () => {
    const response = await testApi.get(`${LINK}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual("[]");
  });

  it("Should add user", async () => {
    const response = await testApi.post(LINK).send(JSON.stringify(newUser));
    expect(response.statusCode).toBe(201);
    userIDs.push(JSON.parse(response.body).id);
  });

  it("Should add user", async () => {
    const response = await testApi.post(LINK).send(JSON.stringify(newUser));
    expect(response.statusCode).toBe(201);
    userIDs.push(JSON.parse(response.body).id);
  });

  it("Should get 2 users", async () => {
    const response = await testApi.get(`${LINK}`);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).length).toBe(2);
  });

  it("Should remove user", async () => {
    const userID = userIDs.pop();
    const response = await testApi.delete(`${LINK}/${userID}`);
    expect(response.statusCode).toBe(204);
  });

  it("Should remove user", async () => {
    const userID = userIDs.pop();
    const response = await testApi.delete(`${LINK}/${userID}`);
    expect(response.statusCode).toBe(204);
  });

  it("Should get empty users arr", async () => {
    const response = await testApi.get(`${LINK}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe("[]");
  });
});
