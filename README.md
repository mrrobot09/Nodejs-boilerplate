# Nodejs-Boilerplate-express-es2018
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![6.2.0](https://badge.fury.io/js/express-rest-es2018-boilerplate.svg)](https://badge.fury.io/js/express-rest-es2017-boilerplate) [![Build Status](https://travis-ci.org/danielfsousa/express-rest-es2018-boilerplate.svg?branch=master)](https://travis-ci.org/danielfsousa/express-rest-es2018-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/danielfsousa/express-rest-es2018-boilerplate/badge.svg?branch=master)

Boilerplate/Generator/Starter Project for building RESTful APIs and microservices using Node.js, Express and MongoDB

## Features

<b> Multilayer folder structure</b>

Code with Best Practices of Nodejs and Clean Architecture focused on codebase scalability.

<b> Scalable and easy to use web server </b>

Use Express for requests routing and middlewares. There are some essential middlewares for web APIs already setup, like body-parser, compression, CORS and method-override.

<b> Database integration </b>

Sequelize, an ORM for SQL databases, is already integrated, you just have to set the authentication configurations.

It's also setup with ESLint to make it easy to ensure a code styling and find code smells.

## Requirements

 - [Node v10.8](https://nodejs.org/en/download/current/)
 - [Npm](https://www.npmjs.com/get-npm)

## Getting Started

Clone the repo and make it yours:

```bash
git clone https://github.com/mrrobot09/Nodejs-boilerplate
cd Nodejs-boilerplate
```

Install dependencies:

```bash
npm
```

## Running Locally

```bash
npm start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## License

[Usman Saleem](https://github.com/mrrobot09)
