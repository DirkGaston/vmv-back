/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthData:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The access token (JWT) for the user
 *         refreshToken:
 *           type: string
 *           description: The refresh token for the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         role:
 *           type: string
 *           description: The role of the user (client, admin, etc.)
 *         id:
 *           type: integer
 *           description: The ID of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
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
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthData"
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: ["refreshToken"]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
