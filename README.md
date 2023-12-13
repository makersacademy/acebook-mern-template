# Acebook - Facebook Clone

Acebook is a collaborative project that aims to recreate the essence of Facebook in a simplified manner. Developed by a group of contributors, Acebook is built using Node.js and React, with a primary focus on providing a platform for user interaction through posts, comments, and avatars.

![Acebook Demo](/public/acebook_demo.gif)


## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Server](#server)
- [Client](#client)
- [Testing](#testing)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with Acebook:

1. Clone the repository: `git clone https://github.com/your-username/acebook.git`
2. Navigate to the project directory: `cd acebook`
3. Install dependencies for both the server and client: `npm install` in the root directory and the `client` directory.
4. Set the JWT_SECRET environment variable: `export JWT_SECRET="your-secret-key"`
5. Start the server: `npm start` in the root directory.
6. Start the client: `npm start` in the `client` directory.

## Features

Acebook provides the following features:

- User authentication and authorization with JWT tokens.
- Creating and viewing posts on the main feed.
- Liking and commenting on posts.
- Uploading avatars for user profiles.
- Viewing user profiles and their posts.

## Server

The server, built using Node.js and Express, handles authentication, posts, comments, avatars, and user data.

- **Express**: Web application framework for handling HTTP requests.
- **JWT**: JSON Web Token for user authentication.
- **Multer**: Middleware for handling file uploads.

## Client

The client, built using React, offers a user interface for interacting with Acebook.

- **React**: JavaScript library for building user interfaces.
- **React Router**: Library for handling navigation and routing.
- **CSS Modules**: Modular CSS styling for components.

## Testing

The project includes testing with Cypress and Jest. The group worked collaboratively on a legacy codebase with only authentication, and testing was introduced to ensure the stability and reliability of the existing functionality.

- **Cypress**: End-to-end testing framework for web applications.
- **Jest**: JavaScript testing framework for unit and integration testing.

## Usage

1. After starting both the server and client, navigate to `http://localhost:3000` in your browser.
2. Sign up for an account or log in if you already have one.
3. Explore the main feed, create posts, and interact with other users.

## Contributing

If you want to contribute to Acebook:

1. Fork the repository: Click the "Fork" button on the GitHub repository.
2. Clone your fork: `git clone https://github.com/your-username/acebook.git`
3. Create a new branch: `git checkout -b feature-name`
4. Make your changes and commit them: `git commit -m "Add new feature"`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
