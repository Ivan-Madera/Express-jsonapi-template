import { v4 as uuidv4 } from 'uuid'
import {
  type IJsonApiData,
  type IJsonApiResponseData,
  type IJsonApiResponseError,
  type IJsonApiResponseGeneric,
  type IJsonApiResponseMessage
} from '../entities/jsonApiResponse.entity'
import { ErrorTitles } from './errorTitles'
import { ErrorCodes } from './errorCodes'

export const JsonApiResponseData = (
  type: string,
  attributes: any | any[],
  links: string,
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

export const JsonApiResponseMessage = (
  type: string,
  message: string,
  links: string
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
        self: links
      }
    }
  }
}

export const JsonApiResponseError = (
  status: number,
  pointer: string,
  suggestions: string,
  detail: any
): IJsonApiResponseError => {
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
  status: number,
  pointer: string,
  suggestions: string,
  detail: string
): IJsonApiResponseError => {
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
