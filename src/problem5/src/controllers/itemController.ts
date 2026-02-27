import { Request, Response, NextFunction } from "express";
import { IItemService } from "../services/itemService";

// This factory function creates and returns a controller object.
// It takes a service as an argument, injecting the dependency.
export const createItemController = (itemService: IItemService) => {
  return {
    // Create
    async createItem(req: Request, res: Response, next: NextFunction) {
      try {
        const { name, description } = req.body;
        const item = await itemService.create({ name, description });
        res.status(201).json(item);
      } catch (error) {
        next(error); // Pass errors to the centralized error handler
      }
    },

    // List with basic filter
    async listItems(req: Request, res: Response, next: NextFunction) {
      try {
        const name = req.query.name as string | undefined;
        const items = await itemService.list(name);
        res.status(200).json(items);
      } catch (error) {
        next(error);
      }
    },

    // Get by ID
    async getItem(req: Request, res: Response, next: NextFunction) {
      try {
        const id = Number(req.params.id);
        const item = await itemService.getById(id);

        if (!item) {
          return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
      } catch (error) {
        next(error);
      }
    },

    // Update
    async updateItem(req: Request, res: Response, next: NextFunction) {
      try {
        const id = Number(req.params.id);
        const { name, description } = req.body;
        const item = await itemService.update(id, { name, description });
        res.status(200).json(item);
      } catch (error) {
        // The service now throws an error, which we can catch.
        // A more advanced error handler would inspect the error type.
        next(error);
      }
    },

    // Delete
    async deleteItem(req: Request, res: Response, next: NextFunction) {
      try {
        const id = Number(req.params.id);
        await itemService.remove(id);
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    },
  };
};
