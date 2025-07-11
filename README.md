# 📦 TEMPLATE NODEJS + JSONAPI

Template de NodeJS para desarrollos cortos y sencillos implementando las respuestas con jsonapi.

## 📂 Tabla de Contenidos

- [🛠️ Tecnologías](#-tecnologías)
- [🗂️ Estructura del proyecto](#-estructura-del-proyecto)
- [🚀 Instalación](#-instalación)
- [🧪 Scripts disponibles](#-scripts-disponibles)
- [🧾 Variables de entorno](#-variables-de-entorno)
- [📡 Endpoints de la API](#-endpoints-de-la-api)
- [📝 Licencia](#-licencia)

## 🛠️ Tecnologías

Este proyecto está construido con:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Json:api](https://jsonapi.org/)
- [Swagger](https://swagger.io/)

## 📁 Estructura del proyecto

```bash
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── entities/
│   ├── errors/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   └── validators/
├── app.ts
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <https://github.com/Ivan-Madera/Express-jsonapi-template>
cd Express-jsonapi-template
npm install
```

## 🧪 Scripts disponibles

Puedes utilizar los siguientes comandos:

```bash
npm run build             # Compila el proyecto TypeScript a JavaScript
npm start                 # Ejecuta el servidor en producción
npm run dev               # Ejecuta el servidor en modo desarrollo con ts-node-dev
npm run jest              # Ejecuta las pruebas automatizadas con Jest
npm run new:migration     # Genera un template para una nueva migración
npm run new:seeder        # Genera un template para un nuevo seeder
npm run migrate           # Ejecuta todas las migraciones nuevas
npm run seeder            # Ejecuta todos los seeders nuevos
```

## 🧾 Variables de entorno

Estas son las variables requeridas para que el proyecto funcione correctamente:

| Variable         | Descripción                                                | Tipo      | Requerida |
|------------------|------------------------------------------------------------|-----------|-----------|
| `ENV`            | Entorno de ejecución                                       | string    | ✅        |
| `PORT`           | Puerto en el que corre la aplicación                       | number    | ✅        |
| `DB_DATABASE`    | Nombre de la base de datos                                 | string    | ✅        |
| `DB_USERNAME`    | Usuario de la base de datos                                | string    | ✅        |
| `DB_PASSWORD`    | Contraseña de la base de datos                             | string    | ✅        |
| `DB_HOST`        | Host o IP del servidor de base de datos                    | string    | ✅        |
| `DB_PORT`        | Puerto de conexión a la base de datos                      | number    | ✅        |
| `TOKEN`          | Token de autenticacion                                     | string    | ✅        |
| `SECRET_KEY`     | Clave secreta para firmar los tokens jwt                   | string    | ✅        |
| `MAX_CONNECTION` | Número máximo de conexiones permitidas simultáneas         | number    | ❎        |
| `MIN_CONNECTION` | Número mínimo de conexiones que se mantienen activas       | number    | ❎        |
| `DB_ACQUIRE`     | Tiempo máximo (ms) para adquirir una conexión              | number    | ❎        |
| `DB_IDLE`        | Tiempo máximo (ms) que una conexión puede estar inactiva   | number    | ❎        |
| `DB_EVICT`       | Intervalo (ms) en el que se eliminan conexiones inactivas  | number    | ❎        |

## 📡 Endpoints de la API

### [V1] Users

| Método | Ruta                 | Descripción                                                   | Autenticación |
|--------|----------------------|---------------------------------------------------------------|---------------|
| POST   | /api/v1/accesstoken  | Obtiene el token jwt de acceso a los endpoint                 | ✅            |
| POST   | /api/v1/users/get    | Obtiene la información de los usuarios activos                | ✅            |
| POST   | /api/v1/users        | Registra la información de un nuevo usuario                   | ✅            |
| PATCH  | /api/v1/users        | Actualiza la información de un usuario exsitente              | ✅            |


## 📝 Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

> La licencia MIT permite a cualquier persona hacer lo que quiera con el código, siempre y cuando se incluya una copia del aviso de derechos de autor y la licencia en cualquier distribución del software.
