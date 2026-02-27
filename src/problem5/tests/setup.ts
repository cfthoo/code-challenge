import dotenv from "dotenv";
import { prisma } from "../src/config/prisma";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.item.deleteMany(); // clean DB before each test
});

afterAll(async () => {
  await prisma.$disconnect();
});
