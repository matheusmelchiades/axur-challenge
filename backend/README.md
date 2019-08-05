# Webservice contacts

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## integrações
Este webservice integra a API [Hubspot](https://developers.hubspot.com/docs/overview) para o armazenamento de contatos.
 Para o uso da mesma, utiliza-se um chave de acesso passada por parametro. Por default o webservice utiliza a chave de acesso publica "demo".
 Para alterar a chave de acesso basta alterar diretamente nas configuraçoes do projeto, apenas altere "apiKeyValue" para a chave de sua escolha.
 ```sh
 $ <Path do projecto>/backend/config/ecosystem.config.js
 ```

 ### Installation

Requer [Node.js](https://nodejs.org/) v12+

Installe as dependencias do projeto e devDependencies e start o servidor.

```sh
$ cd <Path do projeto>/backend
$ npm install
$ npm start
```
A Aplicação iniciara em [http://localhost:5000]

## Observações
Caso queira reiniciar o armazenamento inicial, basta excluir o arquivo:
 ```sh
 $ <Path do projecto>/backend/app/scheduler/integrations.json
 ```
