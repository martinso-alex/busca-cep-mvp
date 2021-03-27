var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

router.get('/:cep', function(req, res, next) {
  getDadosCEP(req.params.cep)
    .then(dadosCEP => res.send(dadosCEP))
    .catch(err => err);
});

module.exports = router;

function getDadosCEP(cep) {
  return fetch("https://buscacepinter.correios.com.br/app/cep/carrega-cep.php?cep=" + cep)
    .then(res => res.json())
    .catch(err => err);
}