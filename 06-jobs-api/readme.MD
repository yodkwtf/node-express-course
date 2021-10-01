#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Setup `.env` in the root
2. Add `MONGO_URI` with correct password and database name
3. Import `connect.js` in app.js
4. Invoke in start()

#### Models

1. User Model
   - get a name [string, 3-50 char]
   - get an email [string, unique, match the regex below]
     - Email Validation Regex
       ```regex
       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       ```
   - get a password [string, 6-12 char]

#### Routes

1. **auth.js** - used for user authentication

   - register user - `app.post('/api/v1/auth/register', register)`
   - login a new user - `app.post('/api/v1/auth/login', login)`

2. **jobs.js** - used for CRUD operations for jobs
   - get all jobs - `app.get('/api/v1/jobs', getAllJobs)`
   - get single job - `app.get('/api/v1/jobs/:id', getJob)`
   - create job - `app.post('/api/v1/jobs', createJob)`
   - update job - `app.pacth('/api/v1/jobs/:id', updateJob)`
   - delete job - `app.delete('/api/v1/jobs/:id', deleteJob)`

#### Controllers

1. `auth.js` - responsible for user authentication

   - register user
   - login a new user

2. `jobs.js` - responsible for CRUD functionality of jobs
   - get all jobs
   - get a specific single job
   - create a job
   - update a specific job
   - delete a specific job

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

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
