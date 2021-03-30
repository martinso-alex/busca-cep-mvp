const app = require('../app');
const request = require('supertest');
const responseMock = require('../data/response-mock.json');

const fetch_mock = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch_mock);

const fetch = require('node-fetch');
fetch.mockResponse(responseMock);

describe("Testes de rotas incorretas", () => {
  test("GET sem parametro CEP = 404", () => {
    return request(app)
      .get("/busca-cep")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });

  test("POST sem parametro CEP = 404", () => {
    return request(app)
      .post("/busca-cep")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });

  test("POST com parametro CEP = 404", () => {
    return request(app)
      .post("/busca-cep/14403471")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
  });
});

const cepMock = require('../data/cep-mock.json');

test("Teste com o CEP da sede do Magazine Luiza", () => {
  return request(app)
    .get("/busca-cep/14403471")
    .then(response => {
      expect(response.body.cep).toStrictEqual(cepMock.cep);
      expect(response.body.estado).toStrictEqual(cepMock.estado);
      expect(response.body.cidade).toStrictEqual(cepMock.cidade);
      expect(response.body.rua).toStrictEqual(cepMock.rua);
      expect(response.body.bairro).toStrictEqual(cepMock.bairro);
    });
});

test("Teste com o CEP inválido", () => {
  return request(app)
    .get("/busca-cep/abcdefghijklmnopq")
    .then(response => {
      expect(response.body.mensagem).toStrictEqual("CEP inválido.");
    });
});

jest.resetAllMocks();
const cep2Mock = require('../data/cep-2-mock.json');

test("Teste com um CEP não encontrado: regra dos zeros", () => {
  return request(app)
    .get("/busca-cep/14403479")
    .then(response => {
      // CEP encontrado: 14403400, CEP pesquisado: 14403479
      expect(response.body.cep).toStrictEqual(cep2Mock.cep);
      expect(response.body.estado).toStrictEqual(cep2Mock.estado);
      expect(response.body.cidade).toStrictEqual(cep2Mock.cidade);
      expect(response.body.rua).toStrictEqual(cep2Mock.rua);
      expect(response.body.bairro).toStrictEqual(cep2Mock.bairro);
    });
});