# Product API

This is a RESTful API for managing products. It allows you to perform CRUD operations (Create, Read, Update, Delete) on products.

## Installation

Clone the repository:

git clone https://github.com/CoderParth/ProductAPI.git

Install dependencies:

```
npm install
```

Set up the database:

Ensure you have a PostgreSQL database available.

Create a .env file in the root directory and provide the database connection URL. For example:

```
DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
```

Run the database migrations:

```
npx prisma migrate dev --name init
```

Seed the database (optional):

If you want to populate the database with some initial data, you can run the seed script:

```
npm run seed
```

Start the server:

```
npm run dev
```

## API Endpoints

Get all products
URL: /products
Method: GET
Query Parameters:
name (optional): Filter products by name
quantity (optional): Filter products by quantity (non-negative integer)
stock (optional): Filter products by stock (non-negative integer)
category (optional): Filter products by category
isActive (optional): Filter products by active status (true or false)
page (optional): Paginate results, specify the page number (1-based)
limit (optional): Paginate results, specify the maximum number of items per page
Response: List of products that match the specified filters and pagination settings

Create a new product
URL: /products
Method: POST
Request Body: JSON object containing product data (name, description, stock, quantity, category, isActive)
Response: Newly created product object

Get a single product by ID
URL: /products/:id
Method: GET
Path Parameters:
id: ID of the product
Response: Product object with the specified ID

Get a single product by name
URL: /products/name/:name
Method: GET
Path Parameters:
name: Name of the product
Response: Product object with the specified name

Update a product
URL: /products/:id
Method: PUT
Path Parameters:
id: ID of the product
Request Body: JSON object containing updated product data (name, description, stock, quantity, category, isActive)
Response: Updated product object

Delete a product
URL: /products/:id
Method: DELETE
Path Parameters:
id: ID of the product
Response: No content (204)
