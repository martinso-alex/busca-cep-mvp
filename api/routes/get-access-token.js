/**
 * @swagger
 * components:
 *   schemas:
 *     access_token:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           description: token JWT para autenticação de rotas
 *       example:
 *         access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXZhbGlhZG9yIiwiaWF0IjoxNjE3MjE2NDQ3fQ.uMheVR8qPoJWt3E9Q0fbtpe5rM0963BPguK_Ar4ue6g
 */
var express = require('express');
var router = express.Router();

var auth = require('../middleware/auth');

/**
 *  @swagger
 *  /get-access-token/{password}:
 *    get:
 *      summary: Retorna um token JWT, se a senha correta for informada.
 *      parameters:
 *        - in: path
 *          name: password
 *          required: true
 *          description: senha para obter um token JWT
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/access_token'
 */
router.get('/:password', auth.get_access_token);

module.exports = router;

