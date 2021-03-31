var express = require('express');
var router = express.Router();

var busca_cep_controller = require('../controllers/buscaCepController');
var auth = require('../middleware/auth');

router.get('/:cep', busca_cep_controller.busca_cep);
router.post('/:cep', auth.authenticate_token, busca_cep_controller.busca_cep);

module.exports = router;

