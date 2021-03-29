var fetch = require('node-fetch');

exports.busca_cep = function (req, res) {
  getDadosCEP(req.params.cep)
    .then(dadosCEP => res.json(dadosCEP))
    .catch(err => err);
};

function getDadosCEP(cep) {
  return fetch("https://buscacepinter.correios.com.br/app/cep/carrega-cep.php?cep=" + cep)
    .then(res => res.json())
    .catch(err => err);
}
