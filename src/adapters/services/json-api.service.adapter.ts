import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'
import {
  JsonApiResponseData,
  JsonApiResponseError,
  JsonApiResponseMessage
} from '../../utils/jsonApiResponses'
import { Codes } from '../../utils/codeStatus'

export const createJsonApiServiceAdapter = () => ({
  createSuccessResponse: (data: any, url: string): IJsonApiResponseGeneric => {
    return {
      status: Codes.success,
      response: JsonApiResponseData('user', data, url)
    }
  },

  createErrorResponse: (error: any, url: string): IJsonApiResponseGeneric => {
    return {
      status: Codes.errorServer,
      response: JsonApiResponseError(error, url)
    }
  },

  createMessageResponse: (message: string, url: string): IJsonApiResponseGeneric => {
    return {
      status: Codes.success,
      response: JsonApiResponseMessage('user', message, url)
    }
  }
})
