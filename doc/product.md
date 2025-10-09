# Product Api Spec

## Get Products

Endpoint : GET /api/products

Query Params :

```json
{
  "search": "komputer",
  "page": 1,
  "limit": 10,
}
```

Response :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "product_name": "komputer",
      "stock": 5,
      "price": 10000000,
    }
    ....
  ],
  "meta": {
    "total_item": 629,
    "page": 1,
    "limit": 10,
    "total_page": 63,
  }
}
```

## Get Categories lookup

Endpoint : GET /api/lookup/product-categories

Query Params :

```json
{
  "search": "electornic",
  "page": 1,
  "limit": 10,
}
```

Response :

```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "name": "komputer",
    }
    ....
  ],
  "meta": {
    "total_item": 20,
    "page": 1,
    "limit": 10,
    "total_page": 2,
  }
}
```

## Create Products

Endpoint : POST /api/products

Request Body :

```json
{
  "product_name": "komputer",
  "category_id": 1,
  "stock": 10,
  "group": "Komputer",
  "price": 10000000
}
```

Response :

```json
{
  "status": 200,
  "message": "Success create new product"
}
```

## Update Products

Endpoint : PUT /api/products

Request Body :

```json
{
  "id": 1,
  "product_name": "komputer",
  "category_id": 1,
  "stock": 10,
  "group": "Komputer",
  "price": 10000000
}
```

Response :

```json
{
  "status": 200,
  "message": "Success update product"
}
```

## Delete Products (with bulk delete)

Endpoint : DELETE /api/products

Request Body :

```json
{
  "ids": [1,2,3],
}
```

Response :

```json
{
  "status": 200,
  "message": "Success delete products"
}
```
