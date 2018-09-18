# JWT AUTHENTICATION USING FACEBOOK LOGIN

This project aims to showcase authentication flow using Facebook login API and JWT:
* Client requests Facebook authentication token directly from the Facebook API
* Client processes response and sends Facebook authentication token to Server
* Server authenticates user on Facebook and obtains user profile information
* Server issues own authentication token (JWT) and provides it to the client


## Project consists of:
* Frontend (client): React/Redux
* Backend (server): Node.js/Express


## Commands:
Build and start server and client:
```
yarn run dev
```

Build and start server only:
```
yarn run dev-backend
```


Build and start client only:
```
yarn run dev-frontend
```

Run tests:
```
yarn run test
```

***