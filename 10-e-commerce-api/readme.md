## Notes

### Packages

#### [express-async-errors](https://github.com/davidbanham/express-async-errors#readme)

When we write a controller function, we wrap everything in try-catch block. Doing that for every controller is a bit tedious so we use the package to do that automatically for us.

#### [morgan](https://github.com/expressjs/morgan#readme)

Tells us which route we're hitting along with the status code after every request, really useful for debugging. We can also set it up to work for development only.

#### [validator](https://github.com/validatorjs/validator.js)

Used to automatically validate emails entered by the users instead of manually setting up regex.

#### [cookie-parser](https://github.com/expressjs/cookie-parser#readme)

Used to parse the cookies send by the browser to get them as a token. Express helps us in setting up cookies but there's no built in way to parse them.

### Q/As

**Q. Why do we need `express.json()` middleware?**

**A.** So we have access to the json data in _req.body_

**Q. Why are we sending signed cookies?**

**A.** Although we can still copy a signed cookie from Chrome and use the same signed cookie on another browser (Mozilla) and can access the data or whatever we needed but we still send signed cookies to figure out if the user has tampered with the data or not.

**Q. Why do we have `router.route('/:id').get(getSingleUser)` as the last route in user routes?**

**A.** Since we're passing the id in this one, if we have this route before a route like `/showMe` then express will take the `showMe` part of the query params as the id.
