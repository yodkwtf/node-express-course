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

**_Ans._** Access token generally has a low expiration time where as refresh token has a longer expiration time. This is because done make sure even if a malicious person gets access to our access token, they can't do much harm since the access token expires very soon. As per as our legit user, we keep creating a new access token for them every time it expires as long as the refresh token is present and hasn't expired. This process is done to add a layer of security to the auth process.

**_Q._ How the `verify-email` route works?**

**_Ans._** We send the user data and the verificationToken created at the time of register via email. When user clicks on the `verify email` link we get the user's email and verificationToken from the frontend url. Then we find the user by email and check if the current verificationToken is same as the one associated to the user in the database at the time of register. If yes, then we add a verified property to the user and set the verificationToken to an empty string.

**_Q._ How `forgot-email` route works?**

**_Ans._** When user forgets their password, they provide their email. Then we send an email to the user with a newly created passwordToken which will be later used to compare when reseting the password. Then we add the passwordToken as a property on user along with passwordExpirationTime. When the user resets the password, first we compare the passwordToken extracted from the frontend url to the one we prev saved in the database. We also check if the expiration time hasn't expired yet. If yes, we reset the password and empty the passwordToken and expirartion date. THIS WORKS SIMILAR TO HOW WE VERIFY A USER"S EMAIL.

**_Q._ What's the point of `verificationToken` for verify-email?**

**_Ans._** Okay so when a user registers an account we create a new `verificationToken` and add it as a property on the newly created user. Then we send an email to the user with all the properties and a custom created frontend url which the user will navigate to when they click on the `verify-email` link from their email. Then we extract the token from the frontend url and compare it the `verficationToken` that we initially saved in the database. If both match, everything went right and we verify the user and erase the `verificationToken` to an empty string.

**_Q_. What's the point of `passwordToken` and `passwordTokenExpirationDate` in forgot-password?**

**_Ans._** Every time a user creates a forgot password request, we create new `passwordToken` and `passwordTokenExpirationDate` properties on the user. Now when they click on the reset password link from their email, we send user to a specific reset-password url where we have a token. Then we compare the two tokens, the one from the user's url and the one in the user properties in the database and only if the two match, considering the password token hasn't expired (basically their's only a certain amount of time for which the reset password link is valid) do we reset the user's password.

**_Q_. At some places we arent checking if email doesnt exist in database (for eg, reset-password, forgot-password). We simply say check your email for reset link. Why is that?**

**_Ans_.** This is because if somebody's trying to attack the app by using someone else's password and all, they won't get additional info about whether or not a certain email exists in our database. If person is legit, we send an email and if they aren't then we basically lie that we have sent an email.

## Preview

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
