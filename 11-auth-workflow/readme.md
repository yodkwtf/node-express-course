## Auth Workflow

A mini project to learn all about auth workflow with nodejs. It contains everything from verifying user emails before registering to reseting user passwords and so much more. It also shows how to deal with multiple cookies and tokens for added layer of security.

#### Goals

- Working with access tokens as well as refresh tokens
- JWT login and sending cookies
- Handling multiple users at once
- Reset password functionality
- Sending emails
- Verifying/Confirming user emails
- Work with a MERN stack app

> All the infomation about the different routes/controllers/models and rest of the functionality are in [guide.md]('/guide.md') including the steps taken to create every single thing in this project.

#### Q/As

- What's the difference b/w accessToken and refreshToken?

- How the `verify-email` route works?

- How `forgot-email` route works?

- What's the point of `verificationToken` for verify-email?

- What's the point of `passwordToken` and `passwordTokenExpirationDate` in forgot-password?

- At some places we arent checking if email doesnt exist in database (for eg, reset-password, forgot-password). We simply say check your email for reset link. Why is that?

## Live Preview

There's not much to see in the project so I did not deploy it to the internet. The only way to preview the app is by running the frontend locally.

#### Local Setup

Clone this repo first if you haven't

```bash
git clone https://github.com/yodkwtf/nodejs-course.git
```

Navigate to project directory, install dependencies for the both the server and the frontend

```bash
npm install && npm start
```
