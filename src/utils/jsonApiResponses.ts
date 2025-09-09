import { v4 as uuidv4 } from 'uuid'
import {
  type IJsonApiData,
  type IJsonApiResponseData,
  type IJsonApiResponseError,
  type IJsonApiResponseGeneric,
  type IJsonApiResponseMessage
} from '../entities/jsonApiResponses.entities'
import { Codes } from './codeStatus'

export const JsonApiResponseData = (
  type: string,
  attributes: any | any[],
  relationships?: any
): IJsonApiResponseData => {
  const uuid = uuidv4()
  const attributesArr = Array.isArray(attributes) ? attributes : [attributes]
  const result = attributesArr.map((obj) => {
    const mappedResult: IJsonApiData = {
      type,
      id: uuid,
      attributes: obj,
      links: {
        self: '' // Se llenará en el controlador
      }
    }

    if (relationships) {
      mappedResult.relationships = relationships
    }

    return mappedResult
  })

  const data = result.length === 1 ? result[0] : result

  return {
    data
  }
}

export const JsonApiResponseMessage = (
  type: string,
  message: string
): IJsonApiResponseMessage => {
  const uuid = uuidv4()

  return {
    data: {
      type,
      id: uuid,
      attributes: {
        message
      },
      links: {
        self: '' // Se llenará en el controlador
      }
    }
  }
}

export const JsonApiResponseError = (
  error: any
): IJsonApiResponseError => {
  const code = error.code || 'ERROR-000'
  const status = error.status || 500
  const pointer = '' // Se llenará en el controlador
  const suggestions = error.suggestions || 'Please try again later'
  const title = error.title || 'Internal Server Error'
  const message = error.message || 'An unknown error occurred'

  return {
    code,
    status,
    source: {
      pointer
    },
    suggestedActions: suggestions,
    title,
    detail: message
  }
}

export const JsonApiResponseGeneric = (
  status: number,
  response:
    | IJsonApiResponseData
    | IJsonApiResponseMessage
    | IJsonApiResponseError
): IJsonApiResponseGeneric => {
  return {
    status,
    response
  }
}

export const JsonApiResponseValidator = (
  pointer: string,
  detail: string
): IJsonApiResponseError => {
  return {
    code: 'ERROR-001',
    status: Codes.unprocessableContent,
    source: {
      pointer
    },
    suggestedActions: 'Check the body of the request.',
    title: 'Invalid request body.',
    detail
  }
}

// Función helper para agregar URL a las respuestas
export const addUrlToResponse = (
  response: IJsonApiResponseData | IJsonApiResponseMessage | IJsonApiResponseError,
  url: string
): IJsonApiResponseData | IJsonApiResponseMessage | IJsonApiResponseError => {
  // Si es una respuesta de datos o mensaje, agregar URL a links.self
  if ('data' in response) {
    if (Array.isArray(response.data)) {
      response.data.forEach(item => {
        if (item.links) {
          item.links.self = url
        }
      })
    } else if (response.data.links) {
      response.data.links.self = url
    }
  }
  
  // Si es una respuesta de error, agregar URL a source.pointer
  if ('source' in response) {
    response.source.pointer = url
  }
  
  return response
}
