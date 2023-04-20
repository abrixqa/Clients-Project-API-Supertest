import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'

describe('Authorization tests', () => {
  describe('Authorization with valid data', async () => {
    it('Response status code is 200', async () => {
      let res = await request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
      console.log(res.body)
      expect(res.statusCode).to.eq(200)
    })
  })
})
