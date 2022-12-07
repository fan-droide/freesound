## About

This is a JS web client example for the usage of the Freesound.org API based on the repositories: 
- https://github.com/g-roma/freesound.js
- https://github.com/amilajack/freesound-client


## Running locally

1. `git clone https://github.com/fan-droide/freesound.git`
2. `cd freesound_webapp`
3. `npm i`
5. `cp .env.example .env`
```bash
# Configure your freesound API id and secret in .env
```
7. `npm start`
8. Open `http://localhost:1234`

## More info

freesound-client API Docs: https://amilajack.github.io/freesound-client/index.html
Check https://freesound.org/docs/api/ for documentation about the Freesound.org API.
Apply for an API key at https://freesound.org/apiv2/apply

## Disclaimer
- Be careful when running all examples at once as you can face throttle issue due to the amount of requests
- The current version of this code is not safe for production as you will expose your secret API when making requests