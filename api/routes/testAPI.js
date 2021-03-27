var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

router.get('/', function(req, res, next) {
  getDadosCEP('71680370')
    .then(dadosCEP => res.send(dadosCEP))
    .catch(err => err);
});

module.exports = router;

function getDadosCEP(cep) {
  return fetch("https://buscacepinter.correios.com.br/app/cep/carrega-cep.php?cep=" + cep)
    .then(res => res.json())
    .catch(err => err);
}