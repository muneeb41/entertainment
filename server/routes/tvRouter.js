const express  =require('express')
const {addBookmark,removeBookmark,getAllBookmarkByEmail} = require('../controller/tvBookmarkController')

const tvRouter = express.Router()
/**
 * @swagger
 * tags:
 *   - name: TV Bookmarks
 *     description: API for managing TV bookmarks.
 */

tvRouter.post('/bookmark',addBookmark)

/**
 * @swagger
 * /tv/bookmark:
 *   post:
 *     summary: Add a TV bookmark
 *     description: Add a TV bookmark for the authenticated user.
 *     tags:
 *       - TV Bookmarks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - adult
 *               - id
 *               - original_name
 *               - overview
 *               - popularity
 *               - poster_path
 *               - genre_ids
 *               - original_language
 *               - origin_country
 *               - first_air_date
 *               - name
 *               - vote_average
 *               - vote_count
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *                 example: "user@example.com"
 *               adult:
 *                 type: boolean
 *                 description: Indicates if the TV show is adult content.
 *                 example: false
 *               id:
 *                 type: number
 *                 description: TV show ID.
 *                 example: 12345
 *               original_name:
 *                 type: string
 *                 description: Original name of the TV show.
 *                 example: "Breaking Bad"
 *               overview:
 *                 type: string
 *                 description: Overview of the TV show.
 *                 example: "A high school chemistry teacher turned methamphetamine manufacturer."
 *               popularity:
 *                 type: number
 *                 description: Popularity score of the TV show.
 *                 example: 85.3
 *               poster_path:
 *                 type: string
 *                 description: URL to the TV show's poster.
 *                 example: "/poster123.jpg"
 *               genre_ids:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: List of genre IDs associated with the TV show.
 *                 example: [18, 80]
 *               original_language:
 *                 type: string
 *                 description: Language of the original title.
 *                 example: "en"
 *               origin_country:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of countries where the TV show was produced.
 *                 example: ["US"]
 *               first_air_date:
 *                 type: string
 *                 description: The date when the TV show first aired.
 *                 example: "2008-01-20"
 *               name:
 *                 type: string
 *                 description: Name of the TV show.
 *                 example: "Breaking Bad"
 *               vote_average:
 *                 type: number
 *                 description: Average rating of the TV show.
 *                 example: 9.3
 *               vote_count:
 *                 type: number
 *                 description: Number of votes the TV show received.
 *                 example: 15000
 *     responses:
 *       200:
 *         description: Bookmark added successfully.
 *       400:
 *         description: Bad request, missing or invalid data.
 *       500:
 *         description: Server error.
 */



tvRouter.delete('/bookmark',removeBookmark)

/**
 * @swagger
 * /tv/bookmark:
 *   delete:
 *     summary: Remove a TV bookmark
 *     description: Remove a TV bookmark for the authenticated user.
 *     tags:
 *       - TV Bookmarks
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
 *                 description: TV show ID.
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Bookmark removed successfully.
 *       404:
 *         description: Bookmark not found.
 *       500:
 *         description: Error removing bookmark.
 */




tvRouter.get('/bookmark',getAllBookmarkByEmail)
/**
 * @swagger
 * /tv/bookmark:
 *   get:
 *     summary: Get all TV bookmarks
 *     description: Retrieve all TV bookmarks for the authenticated user by email.
 *     tags:
 *       - TV Bookmarks
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the bookmark.
 *                     example: "67890"
 *                   title:
 *                     type: string
 *                     description: Title of the TV show.
 *                     example: "Stranger Things"
 *                   description:
 *                     type: string
 *                     description: Description of the TV show.
 *                     example: "A group of kids uncover supernatural mysteries in their town."
 *                   userEmail:
 *                     type: string
 *                     description: Email of the user who bookmarked the show.
 *                     example: "user@example.com"
 *       404:
 *         description: No bookmarks found.
 *       401:
 *         description: Unauthorized, JWT token required.
 *       500:
 *         description: Server error.
 */


module.exports = tvRouter;