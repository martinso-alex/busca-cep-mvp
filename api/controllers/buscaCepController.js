var fetch = require('node-fetch');

exports.busca_cep = function (req, res) {
  resolveGetDados(req.params.cep)
    .then(dadosCep => res.send(dadosCep))
    .catch(err => err);
};

function resolveGetDados(cep) {
  return getDadosCEP(cep)
    .then(res => {
      if (res.dados[0] && res.dados[0].uf) {
        return {
          "cep": res.dados[0].cep,
          "estado": res.dados[0].uf,
          "cidade": res.dados[0].localidade,
          "rua": res.dados[0].logradouroDNEC,
          "bairro": res.dados[0].bairro,
        };
      } else if (res.mensagem === "CEP NAO ENCONTRADO") {
        return resolveGetDados(substituiZero(cep));
      } else {
        return {"mensagem" : "CEP inválido."};
      }
    })
    .catch(err => err);
}

function getDadosCEP(cep) {
  return fetch("https://buscacepinter.correios.com.br/app/cep/carrega-cep.php?cep=" + cep)
    .then(res => res.json())
    .catch(err => err);
}

function substituiZero (n) {
  n = String(Number(n)).split('');
  for (i=1; i <= n.length; i++) {
  	if (n[n.length - i] !== '0') {
    	n[n.length - i] = '0';
      return n.join('');
    }
  }
}
