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

- get a name [string, 3-50 char]
- get an email [string, unique, match the regex below]
  - Email Validation Regex
    ```regex
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ```
- get a password [string, 6-12 char]

## Routes

#### `auth.js` - used for user authentication

- register user - `app.post('/api/v1/auth/register', register)`
- login a new user - `app.post('/api/v1/auth/login', login)`

#### `jobs.js` - used for CRUD operations for jobs

- get all jobs - `app.get('/api/v1/jobs', getAllJobs)`
- get single job - `app.get('/api/v1/jobs/:id', getJob)`
- create job - `app.post('/api/v1/jobs', createJob)`
- update job - `app.pacth('/api/v1/jobs/:id', updateJob)`
- delete job - `app.delete('/api/v1/jobs/:id', deleteJob)`

## Controllers

#### `auth.js` - responsible for user authentication

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

#### `jobs.js` - responsible for CRUD functionality of jobs

- get all jobs
- get a specific single job
- create a job
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
