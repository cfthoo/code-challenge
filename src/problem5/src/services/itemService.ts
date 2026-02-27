import { prisma } from "../config/prisma.js";
import { Item } from "@prisma/client";
import { NotFoundError } from "../errors/customErrors";

// Define the shape of the data for creating and updating an item
export interface ItemData {
  name: string;
  description?: string;
}

// This is the "contract". It defines what any ItemService MUST be able to do,
// without specifying HOW it does it. This is the abstraction we will depend on.
export interface IItemService {
  create(data: ItemData): Promise<Item>;
  list(name?: string): Promise<Item[]>;
  getById(id: number): Promise<Item | null>;
  update(id: number, data: ItemData): Promise<Item>;
  remove(id: number): Promise<Item>;
}

// This is the "concrete implementation". It fulfills the IItemService contract
// using Prisma. If you wanted to switch to a different database or ORM, you
// could simply create a new class that implements IItemService, and the rest
// of your application wouldn't need to change.
export class PrismaItemService implements IItemService {
  async create(data: ItemData): Promise<Item> {
    return prisma.item.create({
      data,
    });
  }

  async list(name?: string): Promise<Item[]> {
    return prisma.item.findMany({
      where: name ? { name: { contains: name } } : {},
    });
  }

  async getById(id: number): Promise<Item | null> {
    return prisma.item.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: ItemData): Promise<Item> {
    try {
      return await prisma.item.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundError("Item not found for update");
    }
  }

  async remove(id: number): Promise<Item> {
    try {
      return await prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundError("Item not found for deletion");
    }
  }
}
