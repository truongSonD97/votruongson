# Resource Management API

This is a simple CRUD API for managing resources built with ExpressJS and TypeScript.

## Pre-requisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 12 or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (either a local installation or a connection string to a MongoDB instance)

## Installation

1. **Clone the repository**:
    ```sh
    git clone git@github.com:truongSonD97/votruongson.git
    cd votruongson
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

    Or if you're using yarn:
    ```sh
    yarn install
    ```

## Configuration

Create a `.env` file in the root of the project and add the following environment variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/resourceDB

```
## Running the Application
To start the application, run:
```sh
npm run dev
```
Or if you're using yarn:
```sh
yarn dev
```

# API Documentation

## Endpoints

### 1. Create a Resource

- **URL:** `/resources`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Resource Name",
    "description": "Resource Description",
    "type": "HUMAN"
  }

- **Description:** Creates a new resource with the specified name, description, and type.


- **Example Request:**

    ```sh
    curl -X POST http://localhost:3000/resources \
    -H "Content-Type: application/json" \
    -d '{"name": "New Resource", "description": "Description of new resource", "type": "HUMAN"}'
    ```
### 2. List Resources

- **URL:** `/resources`
- **Method:** `GET`

- **Query Parameters:**
  - **page** (optional): Page number for pagination. Defaults to 1 if not provided.
  - **limit** (optional): Number of resources per page. Defaults to 10 if not provided.
  - **name** (optional): Filter by name (case insensitive). You can use partial matches (e.g., "Resource").
  - **type** (optional): Filter by type. Valid values include `HUMAN` and `EQUIPMENT`.
  - **fields** (optional): Comma-separated list of fields to return. For example, `name,description` to return only those fields.
  - **sortField** (optional): Field to sort by (e.g., `createdAt`, `name`).
  - **sortOrder** (optional): Order to sort results. Can be `asc` (ascending) or `desc` (descending).

- **Example Request:**
    ```sh
    curl -X GET "http://localhost:3000/resources?page=1&limit=10&name=Resource&type=HUMAN&fields=name,description&sortField=createdAt&sortOrder=desc"
    ```
 **Example Response:**
  ``` json
{
  "total": 5,
  "resources": [
    {
      "_id": "60d5c4e3f3a6b63d04bfb1d0",
      "name": "New Resource",
      "description": "Description of new resource",
      "type": "HUMAN",
      "createdAt": "2021-07-05T18:37:31.302Z",
      "updatedAt": "2021-07-05T18:37:31.302Z"
    },
    {
      "_id": "60d5c4e3f3a6b63d04bfb1d1",
      "name": "Another Resource",
      "description": "Another description",
      "type": "EQUIPMENT",
      "createdAt": "2021-07-06T18:37:31.302Z",
      "updatedAt": "2021-07-06T18:37:31.302Z"
    }
    // More resources...
  ]
}
```

**Description:**
This endpoint retrieves a list of resources based on the provided query parameters. It supports pagination, filtering, dynamic field selection, and sorting.

- **Pagination:** Use `page` and `limit` to control the pagination of results.
- **Filtering:** Use `name` and `type` to filter resources.
- **Field Selection:** Use `fields` to specify which fields to include in the response.
- **Sorting:** Use `sortField` and `sortOrder` to control the sorting of results.

Replace `http://localhost:3000` with the actual URL where your server is running.

### 3. Update Resource

- **URL:** `/resources/:id`
- **Method:** `PUT`

- **Path Parameter:**
  - **id:** The ID of the resource to update.

- **Body:**
  ```json
  {
    "name": "Updated Resource Name",
    "description": "Updated Resource Description",
    ///... 
  }

### 4. Delete Resource

- **URL:** `/resources/:id`
- **Method:** `DELETE`

- **Path Parameter:**
  - **id:** The ID of the resource to delete.

- **Example Request:**
  ```sh
  curl -X DELETE http://localhost:3000/resources/60d5c4e3f3a6b63d04bfb1d0


### Validation

The API uses `class-validator` for validating request payloads. Only specified fields in DTOs (Data Transfer Objects) will be validated and processed. Fields not included in the DTOs will not be updated.

### Error Handling

The API returns appropriate HTTP status codes and error messages for different error scenarios, such as validation errors and resource not found.
