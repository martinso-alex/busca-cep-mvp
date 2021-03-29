var express = require('express');
var router = express.Router();

var busca_cep_controller = require('../controllers/buscaCepController');

router.get('/:cep', busca_cep_controller.busca_cep);

module.exports = router;

