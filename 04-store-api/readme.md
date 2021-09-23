## Store API

An API created to fetch products for a store using the GET method. The products are filtered based on various conditions set up using the query parameters. We also have sorting, pagination, numeric filteres, etc.

## Preview

The API isn't yet deployed anywhere. The only way to preview the api is by running it locally.

#### How to run?

- Clone this repo first if you haven't
  ```bash
  git clone https://github.com/yodkwtf/nodejs-course.git
  ```
- Use the terminal and navigate to `04-store-api` directory
- Install the dependencies and run the server
  ```bash
  npm install && npm start
  ```
- You can see the various routes and filteres either by navigating manually on port 3000 or using a third party tool like postman

### Goals

- Filter data using query parameters
- Sorting data using query parameters and mongoose methods
- Setting up custom pagination using query params
- Work with numeric filters using mongoose regex
- Setting up custom filters on the backend makes the work a lot easier for the user using the API at the frontend. Basically the frontend is only left with the task of fetching the required data.

### Routes

- get('/products') - to get all the products
- get('/products/static') - same as above but for testing

### Packages

- `express-async-errors` - removes the need of creating an async wrapper middleware to wrap the trycatch block of all the controllers and does all the heavy lifting itself

### Features

_`/api/v1/products?...`_

#### Sort

- Used as `/products?sort=-name,price`
- Sorting products based on properties
- `price` to sort in asc order
- `-price` to sort in desc order
- `-name, price` to sort in reverse alphabetical order and asc price order for same names

#### Filters

- Used as `/products?name=a&featured=true`
- Filters products based on specified properties
- Based on _featured_ products [true, false]
- Based on product _company_ name [single type options]
- Based on product _name_ [using mongoose regex pattern]
- Based on _numeric filters_ [using mongoose regular expressions]
  - `/products/price>=40` returns products with price of 40 and above
  - we use _replace_ method to replace `>=` into mongoose regex `$gte`
  - we split the filter into 3 parts - field, opeartor, value [price, $gte, 40]
  - we dynamically set up a key value pair on query object `queryObject[field] = { [operator]: Number(value) }`
  - it looks like `Product.find(*{price: {'$gte':40}}*)`

#### Fields

- Used as `/products?fields=name,rating`
- Returns only specific fields for the products
- Will have the default `_id` property in all cases

#### Limit & Skip

- Used together to setup pagination
- `/products?limit=3` returns only 3 products
- If limit >= no. of products, it will return all products
- `/products?skip=5` will skip the first 5 products and return the rest
- If skip >= no. of products, no products will be returned
- `/products?limit=3&page=2` will skip the first 3 items and show us the items from 4th to 6th
