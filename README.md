# Vinyl Store

## Description

The **Vinyl Store** project is a backend API for managing vinyl records. It includes user registration, authentication (both Google and traditional email/password-based login), and role-based access control. The system uses JWT for secure authentication and TypeORM for database management.

For admins, the available functionalities include managing vinyl records, deleting reviews, and viewing logs.

For users, the available features include browsing and purchasing vinyls (payment integration via Stripe), leaving reviews, managing account information, logging out, and deleting their account. Additionally, users receive email notifications for their purchases.

The project is deployed on **Heroku**. Swagger documentation is available [here](https://vinyl-store-awesome-app-ac28f998a426.herokuapp.com/api/).

## Technologies

-   TypeScript
-   NestJS
-   MySQL, TypeORM
-   Authentication: Passport (with JWT, Google OAuth2, and local strategies)
-   Logging: Winston
-   Email Service: Nodemailer
-   Payment Gateway: Stripe
-   Code quality: ESLint, Prettier, git-hooks
-   Testing: node:test

## How to Run the Project

### Local Development

1.  Install the dependencies:

        npm install

2.  Set up the `.env` file with necessary environment variables, including database credentials, JWT secret, and OAuth keys. Example can be found in `env.example`

3.  Run the development server:

        npm run start:dev

### Production

To build the project and run it in a production mode

1.  Build the project:

        npm run build

2.  Start the application in production:

        npm run start:prod

### Database Migrations

The project uses TypeORM for database interactions, and you can manage migrations with the following commands:

Run migrations:

        npm run migration:run

Generate a new migration:

        npm run migration:gen --name=<migration-name>

Create a new migration:

        npm run migration:create --name=<migration-name>

Revert the last migration:

        npm run migration:revert

### Linting and Formatting

Lint the project:

        npm run lint

Format the code using Prettier:

        npm run format

### Testing

To run the unit tests:

        npm run test
