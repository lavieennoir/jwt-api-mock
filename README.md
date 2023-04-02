# jwt-api-mock
Mock of the authorization API. The main purpose is to allow you to test the [@lavieennoir/auth](https://github.com/lavieennoir/auth) package.

This application is build using Netlify serverless functions.

## Scripts

Install packages:
```
yarn
```

Make sure you are logged into the Netlify
```
npx netlify login
```

Set environment variables listed in `example.env` file using `netlify env` commands.

Run functions locally:
```
yarn dev
```

## Endpoints

Please use `Content-Type: application/json` to perform requests.

For the endpoints below the local host is used. If you would like to use deployed version of the app
use the host specified in a Github repository description.

## Sign in
```
POST http://localhost:9999/.netlify/functions/sign-in
```

Body should contain `email` and `password` fields.

Here are 2 example users available for sign in:
```
{
  "email": "johndoe@example.com",
  "password": "b^NLy5mN9J24F^8c"
}
```

```
{
  "email": "jacksmith@example.com",
  "password": "B0%2322SvS7gkdgP"
}
```


## Refresh tokens
```
POST http://localhost:9999/.netlify/functions/refresh
```

Body should contain `refreshToken` field.
For example:
```
{
  "refreshToken": "eyJhbGciOiJIU...",
}
```

## Profile
```
GET http://localhost:9999/.netlify/functions/refresh
```

This endpoint is authenticated. You should pass the `Authorization` header in a format `Bearer {access_token}` to access it.