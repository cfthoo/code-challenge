## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <your-repo-url>
cd problem-5
npm install
```

### 2. Database Setup

This project uses Prisma with a SQLite database. To initialize and seed your database, run:

```bash
npx prisma migrate dev --name init
```

This will create the database file and apply the schema found in `prisma/schema.prisma`.

### 3. Environment Configuration

Create a `.env` file in the root of the project and add the following variables. This file stores your JWT secret and database connection string.

```env
# The secret key used to sign and verify JWTs
JWT_SECRET="your_super_secret_key"

# Prisma database URL (defaults to SQLite)
DATABASE_URL="file:./dev.db"
```

For running tests, create a `.env.test` file. The test environment uses this file to load a separate secret and a test-specific JWT.

```env
# .env.test
JWT_SECRET="your_super_secret_key_for_testing"
TEST_JWT="your_generated_jwt_for_testing"
```

### 4. Running the Application

To start the development server, run:

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified by `process.env.PORT`).

### 5. Running Tests

To run the unit and integration tests, use:

```bash
npm test
```

## API Endpoints

All endpoints are protected and require a valid JWT `Bearer` token in the `Authorization` header.

| Method   | Endpoint     | Protection | Description                         |
| :------- | :----------- | :--------- | :---------------------------------- |
| `POST`   | `/items`     | JWT        | Creates a new item.                 |
| `GET`    | `/items`     | JWT        | Retrieves a list of all items.      |
| `GET`    | `/items/:id` | JWT        | Retrieves a single item by its ID.  |
| `PUT`    | `/items/:id` | JWT        | Updates an existing item by its ID. |
| `DELETE` | `/items/:id` | JWT        | Deletes an item by its ID.          |

### Example Request Body (POST /items)

```json
{
  "name": "My New Item",
  "description": "An optional description for the item."
}
```

### Example Request Body (PUT /items/:id)

```json
{
  "name": "An Updated Name"
}
```

### Example Response Body (GET /items/:id)

```json
{
  "id": 1,
  "name": "My First Item",
  "description": "A detailed description of the first item.",
  "createdAt": "2023-10-27T10:00:00.000Z",
  "updatedAt": "2023-10-27T10:00:00.000Z"
}
```

### Example Response Body (GET /items)

```json
[
  {
    "id": 1,
    "name": "My First Item",
    "description": "A detailed description of the first item.",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "My Second Item",
    "description": null,
    "createdAt": "2023-10-27T10:05:00.000Z",
    "updatedAt": "2023-10-27T10:05:00.000Z"
  }
]
```
