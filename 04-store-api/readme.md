### Routes

- get('/products') - to get all the products
- get('/products/static') - same as above but for testing

### Packages

- `express-async-errors` - removes the need of creating an async wrapper middleware to wrap the trycatch block of all the controllers and does all the heavy lifting itself

### Filters & Sort

- Getting all products
- Based on featured products [true, false]
- Based on product company name [single type options]
- Based on product name [using mongoose regex pattern]
- Sorting products based on properties
