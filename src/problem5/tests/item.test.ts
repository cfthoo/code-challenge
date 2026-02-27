import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/prisma";

const token = process.env.TEST_JWT;
describe("Item CRUD API", () => {
  beforeEach(async () => {
    // Clean the database to ensure test isolation
    await prisma.item.deleteMany({});
  });
  describe("POST /items", () => {
    it("should create an item", async () => {
      const res = await request(app)
        .post("/items")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test Item",
          description: "Test Description",
        });

      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Test Item");
    });
    it("should return 401 if no token is provided", async () => {
      const res = await request(app).post("/items").send({
        name: "Test Item",
        description: "Test Description",
      });
      expect(res.status).toBe(401);
    });
  });

  describe("GET /items", () => {
    it("should list items", async () => {
      await prisma.item.create({
        data: { name: "Item 1" },
      });

      const res = await request(app)
        .get("/items")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });
  });

  describe("GET /items/:id", () => {
    it("should return item by id", async () => {
      const item = await prisma.item.create({
        data: { name: "Single Item" },
      });

      const res = await request(app)
        .get(`/items/${item.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(item.id);
    });

    it("should return 404 if item not found", async () => {
      const res = await request(app)
        .get("/items/9999")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /items/:id", () => {
    it("should update item", async () => {
      const item = await prisma.item.create({
        data: { name: "Old Name" },
      });

      const res = await request(app)
        .put(`/items/${item.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Updated Name" });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Updated Name");
    });
  });

  describe("DELETE /items/:id", () => {
    it("should delete item", async () => {
      const item = await prisma.item.create({
        data: { name: "Delete Me" },
      });

      const res = await request(app)
        .delete(`/items/${item.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(204);

      const found = await prisma.item.findUnique({
        where: { id: item.id },
      });

      expect(found).toBeNull();
    });
  });
});
