## Introdução

Este projeto é um protótipo de buscador de cep. Ao longo deste documento explicarei as decisões de tecnologias, padrões e arquitetura.

## Node vs Java

Considerando o contexto da aplicação que é um serviço a ser desenvolvido rapidamente, sem perspectiva de manutenção futura ou escala, decidi que os aspectos mais relevantes para a escolha da linguagem seriam: curva de aprendizado, facilidade para setup de ambiente de desenvolvimento, debugging, teste e prototipagem do serviço. Por isso, optei pelo node utilizando o framework express.

## API Node + Client React

Além da API em node, decidi criar uma pequena aplicação em react para consumí-la, visando validar seu funcionamento e replicar o uso do cliente. a aplicação react é servida em [http://localhost:3000](http://localhost:3000) e a api node em [http://localhost:9000](http://localhost:9000). Para rodar cada aplicação individualmente, entre na respectiva pasta e utilize os comandos:\
`npm install`\
`npm start`.

<p align="center"><img src="/img/react.jpg"></p>

## Dados dos CEPs

Para obtenção dos dados de endereços de acordo com os CEPs, utilizei o seguinte endpoint dos correios:\
[https://buscacepinter.correios.com.br/app/cep/carrega-cep.php](https://buscacepinter.correios.com.br/app/cep/carrega-cep.php)

## Arquitetura da aplicação

A api foi dividida nas seguintes pastas:
- bin: instruções para inicialização do node server
- routes: configurações de rotas esperadas
- controllers: handles das rotas com as regras de negócios
- middleware: utilitários para executar nas rotas
- tests: testes automatizados utilizando jest
- data: dados mockados utilizados nos testes

Obs: devido ao escopo do projeto, não foi necessário a criação de camadas para lidar com modelos de banco de dados, persistência nem camada de serviço.

## Testes automatizados

Os testes foram desenvolvidos utilizando jest, jest-fetch-mock e supertest. Para rodá-los entre na pasta api e utilize o comando:\
`npm test`.

<p align="center"><img src="/img/jest.jpg"></p>

## Autorização

A rota POST /busca-cep/:cep possui um middleware de autenticação via jwt, para obter o token é necessário acessar a rota GET /get-access-token/open-sesame (:password). Decidi fazer dessa forma para não precisar persistir dados de usuário em banco de dados ou gerar uma pagina de autenticação no client.

Obs: essa rota é igual à rota GET, que não possui autenticação.

## Endpoint de Métricas

Foi utilizados o Prometheus middleware/client para coleta e exibição de métricas. Após startar a aplicação, acesse:\
[http://localhost:9000/metrics](http://localhost:9000/metrics)

Para visualisação e monitoramento das métricas com uma interface mais agradável e gráficos temporais, é indicado o uso do client Grafana:\
[https://prometheus.io/docs/visualization/grafana/](https://prometheus.io/docs/visualization/grafana/)

## Documentação

Foi utilizado o Swagger UI para criação da documentação. Após startar a aplicação, acesse:\
[http://localhost:9000/docs](http://localhost:9000/docs)

<p align="center"><img src="/img/swagger.jpg"></p>

## Referências

Seguem algumas referências utilizadas durante o projeto (além das documentações oficiais):
- [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [How to create a React frontend and a Node/Express backend and connect them](https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)
- [The only 3 steps you need to mock an API call in Jest](https://dev.to/zaklaughton/the-only-3-steps-you-need-to-mock-an-api-call-in-jest-39mb)
- [Authentication and Authorization with JWTs in Express.js](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/)
- [Documenting your Express API with Swagger](https://blog.logrocket.com/documenting-your-express-api-with-swagger/)
