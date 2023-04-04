/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Exercise management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the exercise
 *         title:
 *           type: string
 *           description: The title of the exercise
 *         description:
 *           type: string
 *           description: The description of the exercise
 *         video_url:
 *           type: string
 *           description: The video URL of the exercise
 *         image_url:
 *           type: string
 *           description: The image URL of the exercise
 */

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: List of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Exercise"
 */

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create an exercise
 *     tags: [Exercises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - video_url
 *               - image_url
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               video_url:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exercise created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Exercise"
 */

/**
 * @swagger
 * /exercises/{id}:
 *   patch:
 *     summary: Update an exercise
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the exercise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               video_url:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exercise updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Exercise"
 */

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the exercise to delete
 *     responses:
 *       204:
 *         description: Exercise deleted successfully
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the exercise
 *     responses:
 *       200:
 *         description: Exercise retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 video_url:
 *                   type: string
 *                 image_url:
 *                   type: string
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Server error
 */
