#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Setup `.env` in the root
2. Add `MONGO_URI` with correct password and database name
3. Import `connect.js` in app.js
4. Invoke in start()

## Models

#### User Model

- name [string, 3-50 char]
- email [string, unique, match the regex below]
  Email Validation Regex
  ```regex
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ```
- password [string, min. 6 char]

#### Jobs Model

- company name [string, 0-50 char]
- the position [string, 0-100 char]
- job status [default - pending, choose from rest]
- created by [user who created it, id via User model]
- timestamps are on

## Middlewares

#### Auth Middleware

- Get the auth header
- Verify its syntax
- Extract the JWT token
- Get the token specific data (payload)
- Create a user object in req so it can be accessed in the routes
- Add the middleware to all the required routes
- If all routes need it, add it next to the base api url in the app.js

## Routes

#### _auth.js_ - used for user authentication

- register user - `app.post('/api/v1/auth/register', register)`
- login a new user - `app.post('/api/v1/auth/login', login)`

#### _jobs.js_ - used for CRUD operations for jobs

- get all jobs - `app.get('/api/v1/jobs', getAllJobs)`
- get single job - `app.get('/api/v1/jobs/:id', getJob)`
- create job - `app.post('/api/v1/jobs', createJob)`
- update job - `app.pacth('/api/v1/jobs/:id', updateJob)`
- delete job - `app.delete('/api/v1/jobs/:id', deleteJob)`

> Note that all the routes above need authentication first.

## Controllers

#### **auth.js** - responsible for user authentication

1. Register User

   - Get user data from req.body
   - Validate - name, email, password - with Mongoose [optional]
   - Hash Password with mongoose middleware (using bcryptjs)
   - Save User
   - Generate Token [mongoose instance method]
   - Send Response with Token

2. Login User
   - Validate if email and password are provided
   - If email or password is missing, throw BadRequestError
   - Find user by email
   - Compare Passwords using bcrypt
   - If no user or the password does not match, throw UnauthenticatedError
   - If correct, generate Token
   - Send Response with Token

#### **jobs.js** - responsible for CRUD functionality of jobs

1. Create Job

   - Add the user id as new property on req.body
   - Create a job using the mongoose **create** method
   - Send the job as a response where job is an object with details as its properties

2. Get All Jobs

   - Used **find** method to get all jobs
   - Filter them using the **createdBy** property to only get user specific jobs
   - Sort them by the **createdAt** property
   - Send the jobs as a response along with jobs count

3. Get Job
   - Get the **userId** from `req.user`
   - Get the **jobId** from `req.params`
   - Use **findOne** method to find the single job by jobId and userId
   - Throw 404 error if job isn't found
   - Send the job as the response

- update a specific job
- delete a specific job

## New Packages

#### [bcrypt.js](https://github.com/dcodeIO/bcrypt.js#readme)

- user for hashing passwords
- hashing is one way street
- every little input change will result in new hash

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

## Notes

#### Hashing Passwords

- Setup using `pre` aka before hook of mongoose middleware
- We use bcrypt.js to hash password
- Hashing is one way street, cannot be reversed back to string password
- Every input change creates a new password
- Two hashed passwords can be compared using the _compare_ method of bcrypt

#### Instance Methods

- These are the functions that we can have on our documents
- Instances of our schema where we can use `this` keyword too
- Helps to simplify controller setup
