## About

This is a JS web client example for the usage of the Freesound.org API based on the repositories: 
- https://github.com/g-roma/freesound.js
- https://github.com/amilajack/freesound-client

## Demo
You can check OAuth2 to login into your Freesound account and upload a sound after:
https://freesoundapiclient.web.app

## Running locally

1. `git clone https://github.com/fan-droide/freesound.git`
2. `cd freesound`
3. `npm i`
5. `cp .env.example .env`
```bash
# Configure your freesound API id and secret in .env
```
7. `npm start`
8. Open `http://localhost:1234`

NOTE: Uncomment lines at https://github.com/fan-droide/freesound/blob/a05d410b0bd42041599760c511aa9a61d0201703/src/examples.js#L169 to run the different examples

## More info

- freesound-client API Docs: https://amilajack.github.io/freesound-client/index.html
- Check https://freesound.org/docs/api/ for documentation about the Freesound.org API.
- Apply for an API key at https://freesound.org/apiv2/apply

## Disclaimer
- Be careful when running all examples at once as you can face throttle issue due to the amount of requests
- The current version of this code is not safe for production as you will expose your secret API when making requests