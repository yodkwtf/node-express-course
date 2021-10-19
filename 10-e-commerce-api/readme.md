## E-Commerce API

An e-commerce api created to handle everything that is expected from an e-commerce store. It handles multiple user logins, admin routes, CRUD opeartions for products, reviews, orders, and so much more.

#### Goals

- Learning CRUD opeartions
- JWT login and sending cookies
- Handling multiple user at once
- User based permissions
- Linking different collections together
- Dynamic data update
- Stripe payment
- Creating API docs

> All the infomation about the different routes/controllers/models and rest of the functionality are in [guide.md]('/guide.md') including the steps taken to create every single thing in this project.

#### Live Preview

See the API live with amazing docs created with docgen - [E-Commerce API](https://e-commerce-api-10.herokuapp.com/)

#### Local Setup

Clone this repo first if you haven't

```bash
git clone https://github.com/yodkwtf/nodejs-course.git
```

Navigate to project directory, install dependencies and run the project

```bash
npm install && npm run dev
```

## Packages

#### [express-async-errors](https://github.com/davidbanham/express-async-errors#readme)

When we write a controller function, we wrap everything in try-catch block. Doing that for every controller is a bit tedious so we use the package to do that automatically for us.

#### [morgan](https://github.com/expressjs/morgan#readme)

Tells us which route we're hitting along with the status code after every request, really useful for debugging. We can also set it up to work for development only.

#### [validator](https://github.com/validatorjs/validator.js)

Used to automatically validate emails entered by the users instead of manually setting up regex.

#### [cookie-parser](https://github.com/expressjs/cookie-parser#readme)

Used to parse the cookies send by the browser to get them as a token. Express helps us in setting up cookies but there's no built in way to parse them.

## Q/As

**Q. Why do we need `express.json()` middleware?**

**A.** So we have access to the json data in _req.body_

**Q. Why are we sending signed cookies?**

**A.** Although we can still copy a signed cookie from Chrome and use the same signed cookie on another browser (Mozilla) and can access the data or whatever we needed but we still send signed cookies to figure out if the user has tampered with the data or not.

**Q. Why do we have `router.route('/:id').get(getSingleUser)` as the last route in user routes?**

**A.** Since we're passing the id in this one, if we have this route before a route like `/showMe` then express will take the `showMe` part of the query params as the id.

**Q. Why are we using `if (!this.isModified('password'))` in User model's save function?**

**A.** Because otherwise we end up hashing the passwords everytime a user updates his name/email and we only wanna hash password if it's modified otherwise they wont be able to login after modifying their name/email.

**Q. Why do we need `checkPermissions` utils function?**

**A.** Otherwise any user who's logged in will be able to access the getSingleUser route if he has the ID of any other user and hence accessing their data.

**Q. Why do we use `populate` method?**

**A.** Allows us to reference documents from other collections and get additional info about the them. For eg, when getting all reviews, we can use the method to get info about that product or the user who's review it is.

**Q. What are `mongoose virtuals`?**

**A.** Think of them as properties that do not exist in the database and only exist logically. We create them on the fly when we wanna compute something.

**Q. What are we using `await product.save()` or `await product.remove()` instead of findOneAndUpdate?**

**A.** When we are updating/deleting products we are also updating/deleting their specific reviews side by using the `pre` hook in the model. Using the `.save()` or `.remove()` triggers that hook where as `findOne` ones don't.

**Q. What is the difference between `instance methods` and `static methods`?**

**A.** Both are defined in the model only but we call instance methods on the schema instances in controller whereas static methods are directly invoked on the schema itself (for eg. calcAvgRating).

**Q. Why so many validations in `createOrder` controller?**
**A.** So the role of backend is to verify everything and check data the data as well as stripe clientSecret is valid. If not, the user simply would not be able to enter the `/checkout`[ref. to furniture world] page.

## Notes

1. Comparing UserID's in controllers

   - In this API, only the admin user has the access to CRUD operations and since we are checking for authentication via middlewares, we don't need to check and compare userID in the controllers.

   - However, if there are multiple admin roles with multiple access, we would need to comapre the userID with the user that was attached to the product initially and only if they match then the current user would be able to perform functionality.

   - Suppose `product B` was created by a logged user `X` so we attached the X's user id as the user key on `product B`. Now when the user X request a CRUD route, we will check if the product.user matches X.userId and only then allow him to do the tasks.

   - All this isn't implemented in this particular project but that's how it'll work in real life.

2. Deployment for Production Fixes

   - [] Edit the site url in `/public/index.html` from `localhost:5000` to deployed heroku url

   - The live preview link above is being powered by another instance of this project stored in a separate individual repo and that's why I didn't do the step 1 so that it's easier for me to test things locally

   - [x] Remove extra code from app.js including morgan package

   - [x] Fix `helmet` issue by extracting the javascript from index.html of api-docs and adding to a external js file called `browser-app.js`

   - [x] Link the html with js

   - Re-deploy
