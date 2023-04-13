import { expect } from 'chai'
import request from 'supertest'

describe('Authorization tests', () => {
  describe('Authorization with valid data', async () => {
    it('Response status code is 200', async () => {
      let res = await request('https://clientbase-server.herokuapp.com')
        .post('/v5/user/login')
        .send({ email: 'sol@gmail.com', password: 'kEftok-jercaf-nyvny2' })
      console.log(res.body)
      expect(res.statusCode).to.eq(200)
    })
  })
})
