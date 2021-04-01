/**
 * @swagger
 * components:
 *   schemas:
 *     CEP:
 *       type: object
 *       required:
 *         - cep
 *       properties:
 *         cep:
 *           type: string
 *           description: codigo postal
 *         estado:
 *           type: string
 *           description:  estado
 *         cidade:
 *           type: string
 *           description: cidade
 *         rua:
 *           type: string
 *           description: rua
 *         bairro:
 *           type: string
 *           description: bairro
 *       example:
 *         cep: 14403471
 *         estado: SP
 *         cidade: Franca
 *         rua: Rua Arnulpho de Lima
 *         bairro: Vila Santa Cruz
 */
var express = require('express');
var router = express.Router();

var busca_cep_controller = require('../controllers/buscaCepController');
var auth = require('../middleware/auth');

/**
 *  @swagger
 *  /busca-cep/{cep}:
 *    get:
 *      summary: Retorna o endereço de acordo com o CEP informado.
 *      parameters:
 *        - in: path
 *          name: cep
 *          required: true
 *          description: codigo de enderecamento postal
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CEP'
 */
router.get('/:cep', busca_cep_controller.busca_cep);
/**
 *  @swagger
 *  /busca-cep/{cep}:
 *    post:
 *      summary: Retorna o endereço de acordo com o CEP informado, mediante autenticação.
 *      parameters:
 *        - in: path
 *          name: cep
 *          required: true
 *          description: codigo de enderecamento postal
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CEP'
 */
router.post('/:cep', auth.authenticate_token, busca_cep_controller.busca_cep);

module.exports = router;
