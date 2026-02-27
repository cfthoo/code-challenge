import { Router } from "express";
import { createItemController } from "../controllers/itemController";
import { PrismaItemService } from "../services/itemService";
import { protect } from "../middleware/authMiddleware";

// Create an instance of the concrete service implementation.
const itemService = new PrismaItemService();

// Inject the service into our controller factory to get a controller instance.
const itemController = createItemController(itemService);

const router = Router();
router.use(protect);
// Use the methods from the created controller instance.
router.post("/", itemController.createItem);
router.get("/", itemController.listItems);
router.get("/:id", itemController.getItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

export default router;
