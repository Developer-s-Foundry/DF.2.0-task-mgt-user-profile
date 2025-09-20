# Task Management & User Profile API

## Overview
This is a RESTful API for a task management and user profile system, built with Node.js and the Express framework. It uses TypeORM as the ORM for interacting with a PostgreSQL database and leverages TSOA to automatically generate routes and an OpenAPI specification from TypeScript code.

## Features
- **Express**: Serves as the web server framework for handling HTTP requests and routing.
- **TypeORM**: Provides robust Object-Relational Mapping for database interactions, supporting entities and repositories.
- **TSOA**: Enables the creation of REST APIs using TypeScript classes and decorators, generating routes and Swagger documentation.
- **PostgreSQL**: A powerful, open-source object-relational database system used for data persistence.
- **node-mailjet**: Integrated for sending transactional emails, such as password reset links.

## Getting Started
### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/Developer-s-Foundry/DF.2.0-task-mgt-user-profile.git
    cd DF.2.0-task-mgt-user-profile
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Set up environment variables**
    Create a `.env` file in the root directory and populate it with the required variables listed below.

4.  **Run database migrations**
    ```bash
    npm run migration:run
    ```
5.  **Seed the database (optional)**
    To populate the database with initial data for development:
    ```bash
    npm run seed
    ```
6.  **Start the development server**
    This command builds the TSOA routes and starts the server.
    ```bash
    npm run dev
    ```

### Environment Variables
Create a `.env` file in the project root and add the following variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_db_name
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_db_password

# Server Configuration
SERVER_PORT=3000
NODE_ENV=development

# Mailjet API Keys
MAILJETAPIPUBLICKEY=your_mailjet_public_key
MAILJETAPIPRIVATEKEY=your_mailjet_private_key

# Security
PASSWORD_HASH_SECRET=your_strong_secret_for_hashing
```

## API Documentation
### Base URL
`http://localhost:3000`

### Endpoints
#### PATCH /user/{userId}
Updates a user's profile information.

**Request**:
```json
{
  "first_name": "Jane",
  "last_name": "Doe"
}
```

**Response**:
```json
{
  "data": {
    "id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    "user_name": "johndoe",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "reset_token_hash": null,
    "reset_token_expiry": null,
    "is_verified": "true",
    "is_active": "true",
    "is_staff": "false",
    "date_joined": "2023-10-27T10:00:00.000Z",
    "lastLogin": null
  },
  "message": "User profile successfully updated",
  "statusCode": 200,
  "status": "success"
}
```

**Errors**:
- `404 Not Found`: User not found.
- `500 Internal Server Error`: An unexpected error occurred.

#### GET /user/{userId}
Retrieves a specific user's profile.

**Request**:
No payload required. `userId` is passed in the URL path.

**Response**:
```json
{
  "data": {
    "id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    "user_name": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "reset_token_hash": null,
    "reset_token_expiry": null,
    "is_verified": "true",
    "is_active": "true",
    "is_staff": "false",
    "date_joined": "2023-10-27T10:00:00.000Z",
    "lastLogin": null
  },
  "message": "User profile successfully fetched",
  "statusCode": 200,
  "status": "success"
}
```

**Errors**:
- `404 Not Found`: User not found.

#### POST /user/generate-reset-password-token
Generates a password reset token and sends it to the user's email.

**Request**:
```json
{
  "email": "john.doe@example.com"
}
```

**Response**:
A success or failure message will be returned upon completion. The response structure may vary based on mail sending status.
*If user does not exist:*
```json
{
  "message": "user does not exist",
  "successful": false
}
```

**Errors**:
- `500 Internal Server Error`: Could occur if the email service fails.

#### POST /user/verify-reset-password-token
Verifies the password reset token provided by the user.

**Request**:
```json
{
  "email": "john.doe@example.com",
  "token": "1234"
}
```

**Response**:
```json
{
  "message": "verification successful",
  "successful": true
}
```

**Errors**:
- A response with `successful: false` is returned if the token is invalid, expired, or the user does not exist.

#### POST /user/reset-password
Resets the user's password using a new password. This should be called after successful token verification.

**Request**:
```json
{
  "email": "john.doe@example.com",
  "password": "NewStrongPassword123!"
}
```

**Response**:
```json
{
  "message": "password reset successful",
  "successful": true
}
```

**Errors**:
- A response with `successful: false` is returned if the user does not exist.

#### GET /team/{userId}
Retrieves team data for a specific user.

**Request**:
No payload required. `userId` is passed in the URL path.

**Response**:
```json
[
  {
    "id": "t1e2a3m4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    "name": "Engineering",
    "description": "Handles backend and frontend development.",
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:00:00.000Z",
    "teamMemberships": [
      {
        "id": "m1e2m3b4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        "name": "John in Engineering",
        "description": "Backend developer in Engineering team.",
        "user": {
          "id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
          "user_name": "jdoe",
          "first_name": "John",
          "last_name": "Doe",
          "email": "johndoe@example.com"
        },
        "role": {
          "id": "r1o2l3e4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
          "name": "Developer",
          "description": "Builds and maintains applications."
        }
      }
    ]
  }
]
```

**Errors**:
- `404 Not Found`: You are not in a team, or the user does not exist.

#### GET /task/{taskId}
Retrieves a specific task by its ID.

**Request**:
No payload required. `taskId` is passed in the URL path.

**Response**:
```json
{
  "data": {
    "id": "tsk1-tsk2-tsk3-tsk4-tsk5",
    "name": "Setup Database",
    "description": "Initialize PostgreSQL with schemas and migrations.",
    "user_id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    "user": {
      "id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
      "user_name": "jdoe",
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com"
    }
  },
  "message": "Task successfully fetched",
  "statusCode": 200,
  "status": "success"
}
```

**Errors**:
- `404 Not Found`: Task not found.

#### GET /task/{userId}/user
Retrieves all tasks assigned to a specific user.

**Request**:
No payload required. `userId` is passed in the URL path.

**Response**:
```json
{
  "data": [
    {
      "id": "tsk1-tsk2-tsk3-tsk4-tsk5",
      "name": "Setup Database",
      "description": "Initialize PostgreSQL with schemas and migrations.",
      "user_id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
      "user": {
        "id": "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
        "user_name": "jdoe",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com"
      }
    }
  ],
  "message": "User task successfully fetched",
  "statusCode": 200,
  "status": "success"
}
```

**Errors**:
- `404 Not Found`: User not found or has no tasks.