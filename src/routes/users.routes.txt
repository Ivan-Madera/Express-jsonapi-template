import { Router } from 'express'
import {
  createUser,
  getAccessToken,
  getUsers,
  updateUser
} from '../controllers/user.controller'
import {
  checkAuth,
  checkBearer,
  jsonApiValidator
} from '../middlewares/authentication.middleware'

const router = Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/accesstoken:
 *   get:
 *     tags: ["[V1] Users"]
 *     summary: Obtener el accesstoken
 *     description: Obtiene el accesstoken para los endpoint.
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *          description: Usuario no autorizado.
 *       415:
 *         description: Tipo de medio no soportado.
 *       422:
 *         description: Contenido no procesable.
 *       500:
 *         description: Mensaje de error.
 */
router.get('/accesstoken', [], getAccessToken)

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: ["[V1] Users"]
 *     security:
 *     - bearerAuth: []
 *     summary: Obtener informacion de los usuarios
 *     description: Obtiene la información relevante de los usuarios.
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer token de autenticacion
 *        type: string
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *          description: Usuario no autorizado.
 *       415:
 *         description: Tipo de medio no soportado.
 *       422:
 *         description: Contenido no procesable.
 *       500:
 *         description: Mensaje de error.
 */
router.get('/users', [checkBearer], getUsers)

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags: ["[V1] Users"]
 *     summary: Crea un nuevo usuario
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token de autenticacion
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     default: user
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       nombres:
 *                         type: string
 *                       apellido_paterno:
 *                         type: string
 *                       apellido_materno:
 *                         type: string
 *                       usuario:
 *                         type: string
 *                       contrasenia:
 *                         type: string
 *                       correo:
 *                         type: string
 *                       telefono:
 *                         type: string
 *                       genero:
 *                         type: string
 *                       estado_civil:
 *                         type: string
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *          description: Usuario no autorizado.
 *       415:
 *         description: Tipo de medio no soportado.
 *       422:
 *         description: Contenido no procesable.
 *       500:
 *         description: Mensaje de error.
 */
router.post('/users', [jsonApiValidator, checkAuth], createUser)

/**
 * @swagger
 * /api/v1/users:
 *   patch:
 *     tags: ["[V1] Users"]
 *     summary: Actualiza un usuario existente
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token de autenticacion
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/vnd.api+json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     default: user
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       nombres:
 *                         type: string
 *                       usuario:
 *                         type: string
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *          description: Usuario no autorizado.
 *       415:
 *         description: Tipo de medio no soportado.
 *       422:
 *         description: Contenido no procesable.
 *       500:
 *         description: Mensaje de error.
 */
router.patch('/users', [jsonApiValidator, checkAuth], updateUser)

export { router as Users }
