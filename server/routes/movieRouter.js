const express = require('express');
const auth = require('../middleware/auth.js');
const { addBookmark, removeBookmark, getAllBookmarkByEmail } = require('../controller/movieBookmarkController.js');

const movieRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Movie Bookmarks
 *     description: API for managing Movie bookmarks.
 */

// Add Bookmark
movieRouter.post('/bookmark', auth, addBookmark);
/**
 * @swagger
 * /movie/bookmark:
 *   post:
 *     summary: Add a movie bookmark
 *     description: Add a movie bookmark for the authenticated user.
 *     tags:
 *       - Movie Bookmarks
 *     security:
 *       - BearerAuth: []  # Requires a valid JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - id
 *               - original_title
 *               - overview
 *               - popularity
 *               - poster_path
 *               - adult
 *               - genre_ids
 *               - original_language
 *               - title
 *               - video
 *               - vote_average
 *               - vote_count
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: "user@example.com"
 *               id:
 *                 type: number
 *                 description: Movie ID.
 *                 example: 123
 *               original_title:
 *                 type: string
 *                 description: Movie title.
 *                 example: "Inception"
 *               overview:
 *                 type: string
 *                 description: Movie overview.
 *               popularity:
 *                 type: number
 *                 description: Movie popularity score.
 *                 example: 84.5
 *               poster_path:
 *                 type: string
 *                 description: URL to the movie poster.
 *                 example: "/poster123.jpg"
 *               adult:
 *                 type: boolean
 *                 description: Indicates if the movie is adult content.
 *                 example: false
 *               genre_ids:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: List of genre IDs associated with the movie.
 *                 example: [28, 12, 878]
 *               original_language:
 *                 type: string
 *                 description: Language of the original title.
 *                 example: "en"
 *               title:
 *                 type: string
 *                 description: Title of the movie.
 *                 example: "Inception"
 *               video:
 *                 type: boolean
 *                 description: Indicates if the movie has a video.
 *                 example: false
 *               vote_average:
 *                 type: number
 *                 description: Average rating of the movie.
 *                 example: 8.8
 *               vote_count:
 *                 type: number
 *                 description: Number of votes the movie received.
 *                 example: 1200
 *     responses:
 *       200:
 *         description: Bookmark added successfully.
 *       400:
 *         description: Bad request, missing or invalid data.
 *       401:
 *         description: Unauthorized, JWT token required.
 *       500:
 *         description: Server error.
 *     headers:
 *       Authorization:
 *         description: JWT Bearer token for authentication. Include in the format "Bearer <token>"
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjcyODc4MjR9.d93ossaWiOn09LvCsXZMFUGXXoLlhyeRmknvBXKJvQM"
 */



// Remove Bookmark
movieRouter.delete('/bookmark', auth, removeBookmark);

/**
 * @swagger
 * /movie/bookmark:
 *   delete:
 *     summary: Remove a movie bookmark
 *     description: Remove a movie bookmark by movie ID for the authenticated user.
 *     tags:
 *       - Movie Bookmarks
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - id
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: "user@example.com"
 *               id:
 *                 type: number
 *                 description: Movie ID.
 *                 example: 123
 *     responses:
 *       200:
 *         description: Bookmark removed successfully.
 *       404:
 *         description: Bookmark not found.
 *       401:
 *         description: Unauthorized, JWT token required.
 *       500:
 *         description: Server error.
 */

// Get All Bookmarks
movieRouter.get('/bookmark', auth, getAllBookmarkByEmail);

/**
 * @swagger
 * /movie/bookmark:
 *   get:
 *     summary: Get all movie bookmarks
 *     description: Retrieve all movie bookmarks for the authenticated user by email.
 *     tags:
 *       - Movie Bookmarks
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           example: "user@example.com"
 *         required: true
 *         description: User's email.
 *     responses:
 *       200:
 *         description: Successfully retrieved all bookmarks.
 *       404:
 *         description: No bookmarks found.
 *       401:
 *         description: Unauthorized, JWT token required.
 *       500:
 *         description: Server error.
 */

module.exports = movieRouter;
