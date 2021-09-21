## Task Manager API

An API created to perform CRUD operations in the forms of tasks/to-do-items. We also have a frontend to test the API. We can create, update, delete, and get any and all tasks we want.

## Preview

Since the app uses cloud database but doesn't handle authentication, deploying it live wasn't an option. The only way to preview the app is by running it locally.

#### How to run?

- Open the terminal and navigate to `03-task-manager-api` directory
- Install the dependencies by running
  ```bash
  npm install
  ```
- See it live by running
  ```bash
  npm start
  ```

### Goals

- Persisting data to the cloud
- Performing CRUD operations

### Routes Needed

- get('/tasks', func) - Get all tasks
- post('/tasks', func) - Add a new task
- get('/tasks/:id', func) - Get a specific task
- patch('/tasks/:id', func) - Edit a specific task
- delete('/tasks/:id', func) - Delete a specific task

### Mongoose Model Functions

- create task - Task.create(req.body)
- get all tasks - Task.find({})
- get task - Task.find({\_id:id})
- delete task - Task.findOneAndDelete({\_id:id})
- update task - Task.findOneAndUpdate({ \_id: taskID }, req.body, options object);

### Notes

#### Databases

- While on local, we cam use any of the 2 options provided, when deployed to heroku, we need to check the `allow access from anywhere` option in atlas.
- This is only specific to heroku, on something like Digital Ocean we can just swap up the IP address after deploying and everything works perfectly.

#### Schema

- Schema gives a structure to our data
- Only the properties we specify in schema will be passed to database and rest of thr things will be ignored.

#### Deployment

- We have to set up the port using the process.env environment variable called `PORT` as every deploying platform uses its own port to manage multiple projects
- We have to use an `OR` operator (`||`) to speicfy a fallback port like 3000, usually to run the project locally
