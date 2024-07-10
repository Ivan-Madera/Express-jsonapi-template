import { v4 as uuidv4 } from 'uuid'
import {
  type IJsonResponseApiData,
  type IJsonApiData,
  type IJsonResponseApiMessage,
  type IJsonResponseApiError,
  type IJsonResponseApiGeneric
} from '../interfaces/jsonResponseApi.dtos'
import { ErrorTitles } from './ErrorTitles'
import { ErrorCodes } from './ErrorCodes'

export const JsonResponseApiData = (
  type: string,
  attributes: any | any[],
  links: string,
  relationships?: any
): IJsonResponseApiData => {
  const uuid = uuidv4()
  const attributesArr = Array.isArray(attributes) ? attributes : [attributes]
  const result = attributesArr.map((obj) => {
    const mappedResult: IJsonApiData = {
      type,
      id: uuid,
      attributes: obj,
      links: {
        self: links
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

export const JsonResponseApiMessage = (
  type: string,
  message: string,
  links: string
): IJsonResponseApiMessage => {
  const uuid = uuidv4()

  return {
    data: {
      type,
      id: uuid,
      attributes: {
        message
      },
      links: {
        self: links
      }
    }
  }
}

export const JsonResponseApiError = (
  status: number,
  pointer: string,
  suggestions: string,
  detail: any
): IJsonResponseApiError => {
  return {
    code: ErrorCodes[status],
    status,
    source: {
      pointer
    },
    suggestedActions: suggestions,
    title: ErrorTitles[status],
    detail: detail.message
  }
}

export const JsonResponseApiGeneric = (
  status: number,
  response:
    | IJsonResponseApiData
    | IJsonResponseApiMessage
    | IJsonResponseApiError
): IJsonResponseApiGeneric => {
  return {
    status,
    response
  }
}

export const JsonResponseApiValidator = (
  status: number,
  pointer: string,
  suggestions: string,
  detail: string
): IJsonResponseApiError => {
  return {
    code: ErrorCodes[status],
    status,
    source: {
      pointer
    },
    suggestedActions: suggestions,
    title: ErrorTitles[status],
    detail
  }
}
