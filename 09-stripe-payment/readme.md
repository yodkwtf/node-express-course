## Stripe Payment

A small app created to learn how to handle online payments using [stripe](https://stripe.com/in).

#### Goals

- Learning payment handling with stripe

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

- There is some kind of frontend while working with stripe to handle the payments and that frontend depends on our tech stack.
- Refer to stripe docs for the frontend. However in this project, we're using html and vanilla js.
- The frontend sends a request to the server and the server verifies and sends back the **paymentIntent.client_secret** so that can the frontend can continue the process.

#### Workflow

- User fills up the cart with items
- The cart items and totals are sent to the server via **fetch** and **post** method
- The sent items can be extracted via **req.body** on the server
- On the server, verify and totals with what the frontend is saying
- Communicate with stripe to get the client_secret
- Verify

#### Stripe Controller

- Import stripe
- Get the cart data from the frontend via `req.body`
- Calculate and confirm the product total cost on the server since _it's very easy to manipulate cost from the frontend_ [usually done by comparing costs to the database]
- Communicate with stripe to specify payment details
- Send the client secret as a response to the frontend
- This will verify and allow users to proceed
