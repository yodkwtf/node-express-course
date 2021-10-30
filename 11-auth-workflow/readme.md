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

**_Q._ What's the difference b/w `accessToken` and `refreshToken`?**
**_Ans._**

**_Q._ How the `verify-email` route works?**
**_Ans._**

**_Q._ How `forgot-email` route works?**
**_Ans._**

**_Q._ What's the point of `verificationToken` for verify-email?**
**_Ans._**

**_Q_. What's the point of `passwordToken` and `passwordTokenExpirationDate` in forgot-password?**
**_Ans._** Every a user creates a forgot password request, we create new `passwordToken` and `passwordTokenExpirationDate` properties on the user. Now when they click on the reset password link from their email, we send user to a specific reset-password url where we have a token. Then we compare the two tokens, the one from the user's url and the one in the user properties in the database and only if the two match, considering the password token hasn't expired (basically their's only a certain amount of time for which the reset password link is valid) do we reset the user's password.

**_Q_. At some places we arent checking if email doesnt exist in database (for eg, reset-password, forgot-password). We simply say check your email for reset link. Why is that?**
**_Ans_.** This is because if somebody's trying to attack the app by using someone else's password and all, they won't get additional info about whether or not a certain email exists in our database. If person is legit, we send an email and if they aren't then we basically lie that we have sent an email.

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
