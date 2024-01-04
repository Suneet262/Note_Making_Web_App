# Project Report: Quick Note - Note Making App

## Introduction

This project aims to create a secure and scalable RESTful API for managing notes, with features including user authentication, note CRUD operations, sharing notes, and searching based on keywords. The application is built using Node.js with the Express.js framework and MongoDB as the chosen database.

## Project Structure

The project follows a modular structure for better organization and maintainability:

Database: Contain the database configuration file 
Auth: Include custom middleware functions, such as authentication checks.
Models: Define the data structure using Mongoose schema.
Routes: Define API routes and endpoint handlers.
.env: Contains the Environment Variables used in the project

## Authentication

Implemented user authentication using JWT (JSON Web Token). Users can sign up, log in, and log out. The JWT token is stored in a secure HTTP-only cookie for subsequent authenticated requests.

## Note Management

### CRUD Operations

Implemented API endpoints for basic note operations:

GET /api/notes: Retrieve all notes for the authenticated user.
GET /api/notes/:id: Retrieve a specific note by ID for the authenticated user.
POST /api/notes: Create a new note for the authenticated user.
PUT /api/notes/:id: Update an existing note by ID for the authenticated user.
DELETE /api/notes/:id: Delete a note by ID for the authenticated user.

### Sharing Notes

Implemented the ability to share notes with other users:

POST /api/notes/:id/share: Share a note with another user for the authenticated user

### Search Functionality

Implemented note searching based on keywords:

GET /api/search?q=:query: Search for notes based on keywords for the authenticated user.

## Rate Limiting and Request Throttling Approach

### Approach: 
I've planned a dedicated rateLimiterMiddleware to enforce rate limiting policies. It will be applied selectively based on routes or globally.

I'm considering implementing a token bucket algorithm for scalable rate control, where tokens are replenished at a fixed rate.

## Database: 

Chose MongoDB as the database for its flexibility and scalability.

## Testing Scripts

Clone the repository: git clone [].
Install dependencies: npm install.
Set up the environment variables in config.js.
Run the application: npm start.

## Future Improvements

Although the project is currently focused on the backend,I have planned to develop a frontend application in ReactJs to provide a complete user interface.

I have also planned to integrate Docker and Kubernetes to containerize and orchestrate the application for easier deployment and scalability.

## Conclusion

This project showcases the implementation of a robust and secure RESTful API for note management. 
The chosen technologies and architectural decisions aim to provide a scalable and maintainable solution. 
While the core requirements have been met, future enhancements and improvements can further elevate the project.
