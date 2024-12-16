# TEMPLATE NODEJS + JSONAPI

Template no oficial de NodeJS para desarrollos cortos y sencillos proporcionado por el área de Middleware

## Temas Puntuales
 - NodeJS - Express
 - Sequelize - MYSQL
 - CommonJS
 - Jest
 - Docker
 - GIT

## Documentación
 - [NodeJS](https://nodejs.org/en/docs/)
 - [Express](https://expressjs.com/es/starter/hello-world.html)
 - [Sequelize](https://sequelize.org/docs/v6/getting-started/)
 - [CommonJS](https://nodejs.org/api/modules.html)
 - [AWS CLI](https://aws.amazon.com/es/cli/)
 - [Jest](https://jestjs.io/docs/getting-started)
 - [Docker](https://hub.docker.com/)
 - [GIT](https://git-scm.com/docs/git)

## Preparar entorno de ejecución

Instalar NodeJS, versión 20.x.x o superior.

Definir la variable de entorno ENV=development

Instalar dependencias con comando:
```bash
  npm i
```

Tener una base de datos de MYSQL (se puede cambiar) llamada Pruebas:

Ejecutar las migraciones
```bash
  npm run migrate
```

Ejecutar los seeders
```bash
  npm run seeder
```

Ejecutar el proyecto en local:
```bash
  npm run dev
```

Para el entorno de produccion ya se encuentra listo el Dockerizado y los comandos se encuentran definidos en el package.json por lo que no hace falta realizar ninguna modificacion a menos que se requiera cambiar la imagen.

- Cualquier duda o aclaración contactar al área de Middleware para ser redireccionado al creador del template