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
