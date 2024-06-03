import { Router } from 'express'
import {
  createUser,
  getAccessToken,
  getUsers,
  updateUser
} from '../controllers/users.controller'
import { checkAuth, checkBearer } from '../middlewares/authentication'
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
 * /api/accesstoken:
 *   get:
 *     tags: [Users]
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
 * /api/users:
 *   get:
 *     tags: [Users]
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
 * /api/user:
 *   post:
 *     tags: [Users]
 *     summary: Crea un nuevo usuario
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token de autenticacion
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               usuario:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               genero:
 *                 type: string
 *               estado_civil:
 *                 type: string
 *             required:
 *               - nombres
 *               - apellido_paterno
 *               - apellido_materno
 *               - usuario
 *               - contrasenia
 *               - correo
 *               - telefono
 *               - genero
 *               - estado_civil
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
router.post('/user', [checkAuth], createUser)

/**
 * @swagger
 * /api/user:
 *   patch:
 *     tags: [Users]
 *     summary: Actualiza un usuario existente
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token de autenticacion
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               usuario:
 *                 type: string
 *             required:
 *               - nombres
 *               - usuario
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
router.patch('/user', [checkAuth], updateUser)

export default router
