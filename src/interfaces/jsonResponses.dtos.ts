export interface IErrorObject {
  message: any
  code: number
}

export interface ISuccessObject {
  data: any
  code: number
}

export interface IResponseMessage {
  message: string
  code: number
}

export interface IErrorValidator {
  errors: any[]
  code: number
}
