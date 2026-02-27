import { createItemController } from "../src/controllers/itemController";
import { IItemService, ItemData } from "../src/services/itemService";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { Item } from "@prisma/client";
import { NotFoundError } from "../src/errors/customErrors";

const mockItemService: jest.Mocked<IItemService> = {
  create: jest.fn(),
  list: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const itemController = createItemController(mockItemService);

const { res: mockRes, next: mockNext, mockClear } = getMockRes();

describe("Item Controller (Unit Tests)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClear();
  });

  describe("getItem", () => {
    it("should return a 200 status and the item if found", async () => {
      const mockItem: Item = {
        id: 1,
        name: "Test Item",
        description: "A test",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockReq = getMockReq({
        params: { id: "1" },
        headers: {
          Authorization: `Bearer ${process.env.TEST_JWT}`,
        },
      });

      mockItemService.getById.mockResolvedValue(mockItem);

      await itemController.getItem(mockReq, mockRes, mockNext);

      expect(mockItemService.getById).toHaveBeenCalledWith(1); // Was the service called correctly?
      expect(mockRes.status).toHaveBeenCalledWith(200); // Was the right status sent?
      expect(mockRes.json).toHaveBeenCalledWith(mockItem); // Was the right data sent?
    });

    it("should return a 404 status if the item is not found", async () => {
      const mockReq = getMockReq({ params: { id: "999" } });

      mockItemService.getById.mockResolvedValue(null);

      await itemController.getItem(mockReq, mockRes, mockNext);

      expect(mockItemService.getById).toHaveBeenCalledWith(999);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Item not found" });
    });
  });

  describe("createItem", () => {
    it("should return a 201 status and the created item", async () => {
      const newItemData: ItemData = {
        name: "New Item",
        description: "New Desc",
      };
      const createdItem: Item = {
        id: 2,
        name: newItemData.name,
        description: newItemData.description ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockReq = getMockReq({ body: newItemData });

      mockItemService.create.mockResolvedValue(createdItem);

      await itemController.createItem(mockReq, mockRes, mockNext);

      expect(mockItemService.create).toHaveBeenCalledWith(newItemData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(createdItem);
    });
  });
  describe("updateItem", () => {
    it("should return a 200 status and the updated item", async () => {
      const updateData: Partial<ItemData> = { name: "Updated Name" };
      const updatedItem: Item = {
        id: 1,
        name: "Updated Name",
        description: "A test",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockReq = getMockReq({ params: { id: "1" }, body: updateData });
      mockItemService.update.mockResolvedValue(updatedItem);
      await itemController.updateItem(mockReq, mockRes, mockNext);
      expect(mockItemService.update).toHaveBeenCalledWith(1, updateData);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(updatedItem);
    });
    it("should call next with an error if the item to update is not found", async () => {
      const updateData: Partial<ItemData> = { name: "Updated Name" };
      const mockReq = getMockReq({ params: { id: "999" }, body: updateData });
      const notFoundError = new NotFoundError("Item not found");
      // Simulate the service throwing an error
      mockItemService.update.mockRejectedValue(notFoundError);
      await itemController.updateItem(mockReq, mockRes, mockNext);
      expect(mockItemService.update).toHaveBeenCalledWith(999, updateData);
      // Verify that the error is passed to the error-handling middleware
      expect(mockNext).toHaveBeenCalledWith(notFoundError);
      // Ensure no response is sent directly from the controller
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });
  describe("deleteItem", () => {
    it("should return a 204 status on successful deletion", async () => {
      const mockReq = getMockReq({ params: { id: "1" } });
      // The service returns the deleted item, but the controller sends 204
      const deletedItem: Item = {
        id: 1,
        name: "deleted",
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockItemService.remove.mockResolvedValue(deletedItem);
      await itemController.deleteItem(mockReq, mockRes, mockNext);
      expect(mockItemService.remove).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
    });
    it("should call next with an error if the item to delete is not found", async () => {
      const mockReq = getMockReq({ params: { id: "999" } });
      const notFoundError = new NotFoundError("Item not found");
      mockItemService.remove.mockRejectedValue(notFoundError);
      await itemController.deleteItem(mockReq, mockRes, mockNext);
      expect(mockItemService.remove).toHaveBeenCalledWith(999);
      expect(mockNext).toHaveBeenCalledWith(notFoundError);
    });
  });
});
