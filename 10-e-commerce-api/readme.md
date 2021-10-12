## Notes

#### Q/As

**Q. Why do we need `express.json()` middleware?**

**A.** So we have access to the json data in _req.body_

**Q. Why do we use `express-async-errors` package?**

**A.** When we write a controller function, we wrap everything in try-catch block. Doing that for every controller is a bit tedious so we use the package to do that automatically for us.

**Q. Why do we use `morgan` package?**

**A.** Tells us which route we're hitting along with the status code after every request.. Really useful for debugging. We can also set it up to work for development only.

**Q. Why do we use `validator` package?**

**A.** Used to automatically validate emails entered by the users instead of manually setting up regex.

**Q. Why do we use `cookie-parser` package?**

**A.** Used to parse the cookies send by the browser to get them as a token. Express helps us in setting up cookies but there's no built in way to parse them.
