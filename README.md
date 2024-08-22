# giphy-store-mock

## Requirements
- Docker
- Git
- Giphy API Key

## Installation
```
1. Clone repository from git@github.com:Tamirrrr/giphy-store-mock.git

2. Update "GIPHY_API_KEY" in the .env file with your Giphy API Key

3. Run the following command to start the environment
    sudo docker compose up -d
```

## Possible Improvements for Scalability and Maintainability
### Backend
- Add unit tests and e2e test for the full system integration and functionality
- Add more error handling and logging for both services and the API
- Add a better validation input for DTOs
- Implement JWT authentication with DB to allow auditing and tracking of user's login history and activity monitroing
- Re-implement in memory cache driver of the cache service as in cases where
    redis won't be in use, the in memory cache won't be suitable for high load of traffic
- Use TypeORM migrations to migrate table schemas and static data
- Replace table enum columns with a separate table for the enum values
- Think of a new way for transaction service and payment status flows. Which includes thinking of new ways to
    handle the payment status and transaction status in a more scalable way. Event driven approach after the transaction is completed would be better than blocking requests until processing is finished

### Frontend
- Add tests cases using React Test Library and also integration tests
- Add more error handling and logging for the frontend
- Allow guest users to navigate the store without being forced to be signed in
- Validation inputs for the authentication forms
- Add a better way to handle the user's session and authentication (using secure cookies instead of local storage for storing the access token)
- Restructure the components to be more reusable and maintainable
- Use an SSR framework like Next.js to improve SEO and performance

### Infrastructure
- Improve current dockerfiles as they are not production ready
- Add migration tool such as Liquibase or Goose to have a centralized schema migrations