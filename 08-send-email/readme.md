## Send Email

A small app created to learn how to send emails using nodejs. For this one we're using a very popular package known as [Nodemailer](https://nodemailer.com/about/) to set up the logic along with a service called [Ethereal](https://ethereal.email/) to set up a testing account.

> Since this is just a basic project, we're using a service called Ethereal for testing purposes but in production we will use something much more secure and popular like SendGrid or MailGun to do the same. In such cases, the transporter details must be set up as environment variables.

#### Goals

- Sending emails with nodejs
- Using ethereal for testing purposes
- Using third party services to send secure automated emails

## Preview

The app was too small so I chose not deploy it anywhere. The only way to preview it is by running it locally.

#### Setup

Clone this repo first if you haven't

```bash
git clone https://github.com/yodkwtf/nodejs-course.git
```

Navigate to project directory, install dependencies and run

```bash
npm install && npm start
```

## Notes

- We use [Nodemailer](https://nodemailer.com/about/) to set up the logic but another crucial part of sending emails is a transport service.
- For testing we have options like _Ethereal_ or _Mailtrap_ and for production, the most popular options are _Sendgrid_ and _Mailgun_. However, we can also use _gmail_ if we want.
- The setup for testing to prodcution ones are almost the same.
- In this project we're going to use [Ethereal](https://ethereal.email/).

#### Route

- The route used to send emails is `/send` and the controller is **sendEmail.js**
- Since we only have one route in the project, there are no routers

#### Controller

- Create a _nodemailer_ test account
- Connect to the transport service - _ethereal_ in our case
- Set up the details for transporter
- Set up mail info using specified transporter
- Send mail info as a response for testing
