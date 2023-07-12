# Course Selling Website Backend

This repository contains the backend code for a course selling website. It provides API endpoints for user authentication, managing courses, and retrieving user details.

## Environment Variables

To run the backend server, you need to set up the following environment variables. Create a file named `.env` in the project's root directory and provide the necessary values sanme as`.env.sample`.


## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up the environment variables as described above.
4. Start the server: `npm start`
5. The backend server will be running on the specified port.

## Routes

The backend provides the following routes:

- `POST /signup`: Creates a new admin user. Requires the following parameters in the request body:
  - `name`: Name of the admin user
  - `email`: Email address of the admin user
  - `password`: Password for the admin user

- `POST /login`: Authenticates an admin user and returns a JSON Web Token (JWT). Requires the following parameters in the request body:
  - `email`: Email address of the admin user
  - `password`: Password for the admin user

- `GET /me`: Retrieves the details of the currently logged-in admin user. Requires a valid JWT in the request header (`Authorization: Bearer <jwt>`).

- `POST /courses`: Adds a new course. Requires the following parameters in the request body:
  - `title`: Title of the course
  - `description`: Description of the course
  - `price`: Price of the course

- `PUT /courses/:courseId`: Updates an existing course. Requires the following parameter in the URL path:
  - `courseId`: ID of the course to be updated
  And the following parameter in the request body:
  - `title`: Updated title of the course (optional)
  - `description`: Updated description of the course (optional)
  - `price`: Updated price of the course (optional)

- `GET /courses`: Retrieves all courses. Requires a valid JWT in the request header (`Authorization: Bearer <jwt>`).