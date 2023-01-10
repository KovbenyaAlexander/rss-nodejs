# rss-nodejs

task - https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

- `npm i` - for download node_modules
- `npm run start:dev` - development mode using nodemon
- `npm run start:prod` - production mode
- `npm run test` - run tests
- `npm run start:multi` - start application with a load balancer

  - GET `api/users` is used to get all persons
    - Server will answer with `status code` **200** and all users records
  - GET `api/users/${userId}`
    - Server will answer with `status code` **200** and and record with `id === userId` if it exists
    - Server will answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server will answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - POST `api/users` is used to create record about new user and store it in database
    - Server will answer with `status code` **201** and newly created record
    - Server will answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - PUT `api/users/{userId}` is used to update existing user
    - Server will answer with` status code` **200** and updated record
    - Server will answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server will answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - DELETE `api/users/${userId}` is used to delete existing user from database
    - Server will answer with `status code` **204** if the record is found and deleted
    - Server will answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server will answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
