### Routes

- get('/products') - to get all the products
- get('/products/static') - same as above but for testing

### Packages

- `express-async-errors` - removes the need of creating an async wrapper middleware to wrap the trycatch block of all the controllers and does all the heavy lifting itself

### Features

_'/api/v1/products?..._

#### Sort

- Used as `/products?sort=-name,price`
- Sorting products based on properties
- `price` to sort in asc order
- `-price` to sort in desc order
- `-name, price` to sort in reverse alphabetical order and asc price order for same names

#### Filters

- Used as `/products?name=a&featured=true`
- Filters products based on specified properties
- Based on featured products [true, false]
- Based on product company name [single type options]
- Based on product name [using mongoose regex pattern]

#### Fields

- Used as `/products?fields=name,rating`
- Returns only specific fields for the products
- Will have the default `_id` property in all cases
