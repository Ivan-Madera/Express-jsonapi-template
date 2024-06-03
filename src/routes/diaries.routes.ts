import { Router } from 'express'
import { diaries, diariesCreate } from '../controllers/diaries.controller'
import { diariesCreateValidator } from '../validators/diaries.validators'
import { jsonAPIValidator } from '../middlewares/authentication'
const router = Router()

/**
 * @swagger
 * /api/diaries:
 *   get:
 *     tags: [Diaries]
 *     summary: Obtener informacion de los viajes
 *     description: Obtiene la información relevante de los viajes.
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
router.get('/diaries', [], diaries)

/**
 * @swagger
 * /api/diaries:
 *   post:
 *     tags: [Diaries]
 *     summary: Crea una nuevo diario de viaje
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
 *                     default: diaries
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       weather:
 *                         type: string
 *                       visibility:
 *                         type: string
 *                       comment:
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
router.post(
  '/diaries',
  [jsonAPIValidator, ...diariesCreateValidator],
  diariesCreate
)

export default router
