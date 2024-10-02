const express = require('express');
const { signup, login, logout } = require('../controller/userController.js');

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API for managing Users.
 */

// User Signup Route
userRouter.post('/signup', signup);
/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User Signup
 *     description: Create a new user by providing email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: User already exists or validation error.
 *       500:
 *         description: Server error.
 */


// User Login Route
userRouter.post('/login', login);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User Login
 *     description: Login a user by providing email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *                 example: "strongpassword123"
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: User not found or invalid credentials.
 *       500:
 *         description: Server error.
 */


// User Logout Route
userRouter.post('/logout', logout);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: User Logout
 *     description: Logout the currently authenticated user.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: [] # JWT token required for logout
 *     responses:
 *       200:
 *         description: Logout successful.
 *       401:
 *         description: Unauthorized. Token missing or invalid.
 *       500:
 *         description: Server error.
 */


module.exports = userRouter;
