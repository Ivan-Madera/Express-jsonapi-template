export interface IJsonApiData {
  type: string
  id: string
  attributes: any
  links: {
    self: string
  }
  relationships?: any
}

export interface IJsonResponseApiData {
  data: IJsonApiData | IJsonApiData[]
}

export interface IJsonResponseApiMessage {
  data: {
    type: string
    id: string
    attributes: any
    links: {
      self: string
    }
  }
}
export interface IJsonResponseApiError {
  status: number
  source: {
    pointer: string
  }
  suggestedActions: string
  title: string
  detail: string
}
