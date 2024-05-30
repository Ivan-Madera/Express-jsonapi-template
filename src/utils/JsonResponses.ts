import {
  type IResponseMessage,
  type IErrorObject,
  type ISuccessObject,
  type IErrorValidator
} from '../interfaces/jsonResponses.dtos'

export const ErrorObject = (error: any, code: number): IErrorObject => ({
  message: error.message,
  code
})

export const SuccessObject = (data: any, code: number): ISuccessObject => ({
  data,
  code
})

export const ResponseMessage = (
  message: string,
  code: number
): IResponseMessage => ({
  message,
  code
})

export const ErrorValidator = (
  errors: any[],
  code: number
): IErrorValidator => ({
  errors,
  code
})
