## Notes

#### Q/As

**Q. Why do we need _express.json_ middleware?**
**A.** So we have access to the json data in _req.body_

**Q. Why do we use _express-async-errors_ package?**
**A.** When we write a controller function, we wrap everything in try-catch block. Doing that for every controller is a bit tedious so we use the package to do that automatically for us.
