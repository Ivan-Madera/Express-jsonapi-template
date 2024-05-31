import { v4 as uuidv4 } from 'uuid'
import {
  type IJsonResponseApiData,
  type IJsonApiData,
  type IJsonResponseApiMessage,
  type IJsonResponseApiError
} from '../interfaces/jsonResponseApi.dtos'

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
  title: string,
  detail: any
): IJsonResponseApiError => {
  return {
    status,
    source: {
      pointer
    },
    suggestedActions: suggestions,
    title,
    detail: detail.message
  }
}
