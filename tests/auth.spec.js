import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'

describe('Authorization tests', () => {
  describe('Authorization with valid data', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
    })

    it('Response status code is 200', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq('Auth success')
    })
    it('Response body returns token', () => {
      expect(res.body.payload.token).to.be.a('string')
    })
  })
  describe('Authorization with invalid email', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email: 'your@email.com', password: process.env.PASSWORD })
    })
    it('Response body returns code is 400', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
  describe('Authorization with invalid password', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email: process.env.EMAIL, password: 'qwerty' })
    })
    it('Response body returns code is 400', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
  describe('Authorization without email', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email: '', password: process.env.PASSWORD })
    })
    it('Response body returns code is 400', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
  describe('Authorization without password', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email: 'your@email.com', password: '' })
    })
    it('Response body returns code is 400', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
  describe('Authorization without any credentials', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({ email: '', password: '' })
    })
    it('Response body returns code is 400', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
})
