# WEB3 API

Wallet rest API with using NodeJS, mongoDB and ethers JS.

## Run locally

Clone the project

```
git clone https://github.com/shubhamkr95/web3Api.git
```

Go to project directory and install dependencies

```
cd web3Api && npm install
```

Start the server

```
npm start
```

## Environment Variables

Add the following to the .env file

```
DB_URL="mongodb url"

MAILGUN_API_KEY="get the Mailgun api key"

MAILGUN_DOMAIN="Provide the Mailgun domain"

JWT_SECRET="Your secret"

JWT_EXPIRES_IN="Set the jwt expiration time"

ROPSTEN_API_KEY="Get this key from Alchemy"
```

## Features :

- Email verification on signup

- Authenticate users with token on login

- Transfer ERC20 tokens to other other users

- Admin features

- Get transaction alert on your email

### Deployed Address:

[0xba871f6b449529d2ebef5beb9f8d51968b9919d3](https://ropsten.etherscan.io/tx/0x0e8dc0f62550c10ed11e975a28e9d5bb0cf03553674c4d37ceac9abe383651d1)
