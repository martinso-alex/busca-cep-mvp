# Introdução

Este projeto é um protótipo de buscador de cep. Ao longo deste documento explicarei as decisões de tecnologias, padrões e arquitetura.

# Node vs Java

Considerando o contexto da aplicação que é um serviço a ser desenvolvido rapidamente, sem perspectiva de manutenção futura ou escala, decidi que os aspectos mais relevantes para a escolha da linguagem são: curva de aprendizado, facilidade para setup de ambiente de desenvolvimento, debugging, teste e prototipagem do serviço. Por isso, optei pelo node utilizando o framework express.

# API Node + Client React

Além da API em node, decidi criar uma pequena aplicação em react para consumí-la, visando validar seu funcionamento e replicar o uso do cliente. a aplicação react é servida em localhost:3000 e a api node em localhost:9000. Para rodar cada aplicação individualmente, entre na respectiva pasta e utilize o comando `npm start`.

# Dados dos CEPs

Para obtenção dos dados de endereços de acordo com os CEPs, utilizei o seguinte endpoint dos correios:\
[https://buscacepinter.correios.com.br/app/cep/carrega-cep.php](https://buscacepinter.correios.com.br/app/cep/carrega-cep.php)

# Arquitetura da aplicação

A api foi dividida nas seguintes pastas:
- bin: instruções para inicialização do node server
- routes: configurações de rotas esperadas
- controllers: handles das rotas com as regras de negócios
- tests: testes automatizados utilizando jest
- data: dados mockados utilizados nos testes

obs: devido ao escopo do projeto, não foi necessário a criação de camadas para lidar com modelos de banco de dados, persistência nem camada de serviço.

# Testes

Os testes foram desenvolvidos utilizando jest, jest-fetch-mock e supertest. Para rodá-los entre na pasta api e utilize o comando `npm test`.