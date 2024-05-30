import { body } from 'express-validator'
import { validateResult } from '../middlewares/validation'

export const diariesCreateValidator = [
  body('data').notEmpty().isObject(),
  body('data.type').notEmpty().isString(),
  body('data.attributes').notEmpty().isObject(),
  body('data.attributes.imei').notEmpty().isString(),
  body('data.attributes.orden').notEmpty().isNumeric(),
  (req: any, res: any, next: any) => {
    validateResult(req, res, next)
  }
]
