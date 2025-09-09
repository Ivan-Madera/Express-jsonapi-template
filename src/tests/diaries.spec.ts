import { server } from '../config/server'
import { Codes } from '../utils/codeStatus'
import request from 'supertest'

describe('Tests about diaries', () => {
  test('Get diaries', async () => {
    const response = await request(server.getService())
      .get('/api/v1/diaries')
      .send()

    expect(response.statusCode).toEqual(Codes.success)
  })
})
