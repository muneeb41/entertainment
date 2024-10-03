
# This is a Full-Stack-Project 
 Author - Muneeb

# Entertainment Hub App

The Entertainment App is a full-stack application designed to provide users with access to a vast collection of movies and TV shows, leveraging the TMDB API for fetching media details. It features user authentication, media exploration, and personal bookmarks, offering a comprehensive and personalized media browsing experience.

Home page:
![image](https://github.com/user-attachments/assets/66aac570-7a3d-45a3-9e95-df4dccf31236)
## Deployment live Links

Click it:
[Entertainment hub live link](https://entertainment-client.onrender.com/)



## 🔗 Important links

[API Documentation](https://entertainment-5zis.onrender.com/api-docs) 

[Video Explanation](https)

[Database Design](https://docs.google.com/document/d/1pm5x-JO3ldRanlaXBShOJz49baApUt8HxfeK_mB2XMw/edit?usp=sharing)

[Best Practices](https://docs.google.com/document/d/1Q608pxgHJyfbWB7KeANAurSPM62aTNlnFafzlipqO2Q/edit?usp=sharing)
## Features

- **User Authentication:** Utilizes JWT for secure login and registration, ensuring user data protection.
- **Media Exploration:** Allows users to discover trending movies and TV shows, with detailed views available for each media item.
- **Bookmarks:** Enables users to bookmark their favorite media, creating a personalized list of favorites accessible at any time.
- **Detailed Media Information:** Provides in-depth details about movies and TV shows, including cast, genres, ratings, and more.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB instance (local or remote)
- TMDB API key for fetching media data
## Installation

1.  **Clone the Repository:** Start by cloning the Entertainment App repository to your local machine.

    ```sh
    git clone git@github.com:muneeb41/entertainment.git
    ```
2.  **Navigate to folder:** Move into the server directory of the project and client

    ```sh
    cd server
    ```
    ```sh
    cd client
    ```
3.  **Install Dependencies:** Install the necessary dependencies using npm for both directories client and server.

    ```sh
    npm install
    ```
4.  **Configure Environment Variables:** Create a `.env` file based on the provided `.env.example` file. Provide your MongoDB URI and TMDB API key in the `.env` file.

for Frontend:

    
    VITE_SERVER_URL= "https://entertainment-5zis.onrender.com"
    
for Backend:
```
PORT=8000
DATABASE_URL="mongodb+srv://maxm26246:iamcoder41@cluster0.apgyudc.mongodb.net/Entertainment?retryWrites=true&w=majority&appName=Cluster0"
SECURE_KEY="muneeb41"
```

5.  **Start the App:**

  for Frontend:

     npm run dev

  for Backend:

     npm run start
## Frontend Folder Structure

The following is the folder structure for the **Entertainment Hub** frontend project:

<pre>
ENTERTAINMENT
├── client
│   ├── node_modules
│   ├── public
│   └── src
│       ├── api
│       │   └── serverApi.js          # Handles API requests to the backend
│       ├── assets                    # Static assets such as images, fonts, etc.
│       ├── components                # Reusable UI components
│       │   ├── bookmarks             # Bookmark-related components
│       │   ├── common                # Common UI components like buttons and forms
│       │   ├── home                  # Components for the homepage
│       │   ├── movieDetails          # Components for movie details display
│       │   ├── movies                # Components for displaying movie lists
│       │   ├── tvShowDetails         # Components for TV show details display
│       │   └── tvShows               # Components for displaying TV shows
│       ├── pages                     # Page components for routing
│       │   ├── bookmark              # Bookmark page
│       │   ├── home                  # Home page
│       │   ├── login                 # Login page
│       │   ├── movie                 # Movie listing page
│       │   ├── movieDetailPage       # Movie details page
│       │   ├── noPageFound           # 404 Not Found page
│       │   ├── signup                # Signup page
│       │   ├── tvShow                # TV show listing page
│       │   └── tvShowDetailPage      # TV show details page
│       ├── redux                     # Redux setup for state management
│       ├── App.css                   # Global CSS styles
│       ├── App.jsx                   # Root component for the application
│       ├── index.css                 # Basic CSS for the application
│       └── main.jsx                  # Entry point of the React application
├── .gitignore                        # Files and directories to ignore in Git
├── package.json                      # Project metadata and dependencies
├── package-lock.json                 # Ensures consistent package versions
</pre>

## Backend Folder Structure

This is the folder structure for the **Entertainment Hub** backend.

<pre>
ENTERTAINMENT
├── server
│   ├── config
│   │   └── config.js                # Configuration settings for the application
│   ├── controller                   # Handles logic for different endpoints
│   │   ├── movieBookmarkController.js  # Controller for movie bookmarks
│   │   ├── tvBookmarkController.js     # Controller for TV bookmarks
│   │   └── userController.js           # Controller for user-related operations
│   ├── middleware                  # Middleware for authentication
│   │   └── auth.js                    # Authentication middleware
│   ├── model                       # Mongoose models for MongoDB
│   │   ├── movieModel.js              # Model for movie data
│   │   ├── tvModel.js                 # Model for TV show data
│   │   └── userModel.js               # Model for user data
│   ├── routes                      # Defines API routes
│   │   ├── movieRouter.js             # Routes for movie-related API endpoints
│   │   ├── tvRouter.js                # Routes for TV-related API endpoints
│   │   └── userRouter.js              # Routes for user-related API endpoints
├── .env                              # Environment variables
├── .gitignore                        # Git ignore file
├── index.js                          # Entry point for the backend server
├── package.json                      # Backend project metadata and dependencies
├── package-lock.json                 # Ensures consistent package versions
├── swaggerOptions.js                 # Swagger documentation configuration
</pre>
## Technologies Used in Frontend:


### Core Dependencies

- **React**: A JavaScript library for building fast and interactive user interfaces.
- **React DOM**: Manages rendering React components to the DOM.
- **React Router DOM**: Enables declarative routing and navigation within the app.
- **React Redux**: Manages the global state of the application using the Redux pattern.
- **@reduxjs/toolkit**: Simplifies state management, offering pre-configured Redux logic.
- **Axios**: A promise-based HTTP client used to make API requests.
- **React Toastify**: Library for displaying non-blocking toast notifications in the UI.
- **Swiper**: A modern slider library used to create touch-friendly carousels.
- **React Icons**: Provides popular icons to use across UI components.
- **Tailwind CSS**: A utility-first CSS framework for fast and efficient styling.

### Development Dependencies

- **Vite**: A fast build tool and development server for modern web projects.
- **ESLint**: A linter tool to ensure code quality and consistency.
- **Autoprefixer**: A PostCSS plugin that adds vendor prefixes to CSS rules automatically.
- **PostCSS**: A tool for transforming CSS, mainly used in conjunction with Tailwind CSS for processing styles.

## Scripts

The following scripts are defined in the `package.json`:

- `dev`: Starts the development server using Vite.
- `build`: Builds the application for production.
- `lint`: Runs ESLint to analyze and lint the codebase.
- `preview`: Previews the production build using Vite.

## Backend Technologies Used

### Core Dependencies

- **Express**: A fast and minimalist web framework for building APIs and web applications.
- **Mongoose**: An object data modeling (ODM) library for MongoDB and Node.js, used for managing data models and schemas.
- **MongoDB**: A NoSQL database, storing user and bookmark data for the application.
- **JWT (jsonwebtoken)**: Used for creating and verifying JSON Web Tokens for secure user authentication.
- **bcrypt**: A library for hashing and comparing passwords, ensuring secure password storage.
- **cors**: Middleware to allow cross-origin requests between frontend and backend servers.
- **dotenv**: A module that loads environment variables from a `.env` file into `process.env`, used for managing secrets and environment configuration.

### Additional Dependencies

- **Nodemon**: A development tool that automatically restarts the server when file changes are detected.
- **Swagger JSDoc**: A tool to generate Swagger documentation for APIs based on JSDoc comments.
- **Swagger UI Express**: Allows serving auto-generated API documentation in a user-friendly interface using Swagger.

## Scripts

The following scripts are defined in the `package.json`:

- `start`: Starts the backend server using **Nodemon** to monitor changes in the code and automatically restart the server.


## 
<h4 align="center">Made by Muneeb</h4>
<h4 align="center">Thank You</h4>
