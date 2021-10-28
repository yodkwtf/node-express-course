## Q/As

- What's the difference b/w accessToken and refreshToken?

Access token is used to handle a single login session which will run out very soon whereas refresh token is used for the feature of `stay signed in` so even if the user's sessions runs out, he still doesn't get logged out as long as the refresh token is present. Then if a user logs out, we erase both the access token as well as the refresh token.

- How the `verify-email` route works?

- How `forgot-email` route works?

- What's the point of `verificationToken` for verify-email?

- What's the point of `passwordToken` and `passwordTokenExpirationDate` in forgot-password?
