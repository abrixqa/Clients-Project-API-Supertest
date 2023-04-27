import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'
const chance = require('chance').Chance()

describe.only('Registration', () => {
  describe('Create registration', () => {
    let res
    let newEmail = 'user_' + Date.now() + '@mail.com'
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
          companyName: chance.company(),
          firstName: chance.first(),
          lastName: chance.last(),
          email: newEmail,
          password: chance.hash({ length: 10 }),
          version: 'v5',
        })
    })
    it('Response status code is 201', () => {
      expect(res.statusCode).to.eq(201)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })
  describe('Registration with required data only', () => {
    let res
    let newEmail = 'user_' + Date.now() + '@mail.com'
    console.log(newEmail)
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
          firstName: chance.first(),
          lastName: chance.last(),
          email: newEmail,
          password: chance.hash({ length: 10 }),
        })
    })
    it('Response status code is 201', () => {
      expect(res.statusCode).to.eq(201)
    })
    it('Response body returns correct message', () => {
      expect(res.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })
  describe('Registration without first name', () => {
    let res
    let newEmail = 'user_' + Date.now() + '@mail.com'
    console.log(newEmail)
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
          companyName: chance.company(),
          firstName: '',
          lastName: chance.last(),
          email: newEmail,
          password: chance.hash({ length: 10 }),
        })
    })
    it('Response status code is 404', () => {
      expect(res.statusCode).to.eq(404)
    })
    it('Response body returns an error message', () => {
      expect(res.body.message).to.eq('User was not created')
    })
  })
  describe('Registration without last name', () => {
    let res
    let newEmail = 'user_' + Date.now() + '@mail.com'
    console.log(newEmail)
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
          companyName: chance.company(),
          firstName: chance.first(),
          lastName: '',
          email: newEmail,
          password: chance.hash({ length: 10 }),
        })
    })
    it('Response status code is 404', () => {
      expect(res.statusCode).to.eq(404)
    })
    it('Response body returns an error message', () => {
      expect(res.body.message).to.eq('User was not created')
    })
  })
  describe('Registration without email', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
          companyName: chance.company(),
          firstName: chance.first(),
          lastName: chance.last(),
          email: '',
          password: chance.hash({ length: 10 }),
        })
    })
    it('Response status code is 404', () => {
      expect(res.statusCode).to.eq(404)
    })
    it('Response body returns an error message', () => {
      expect(res.body.message).to.eq('User was not created')
    })
  })
  describe('Registration without password', () => {
    let res
    let newEmail = 'user_' + Date.now() + '@mail.com'
    console.log(newEmail)
    before(async () => {
      res = await request(process.env.BASE_URL).post('/v5/user').send({
        companyName: chance.company(),
        firstName: chance.first(),
        lastName: chance.last(),
        email: newEmail,
        password: '',
      })
    })
    it('Response status code is 400', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Response body returns an error message', () => {
      expect(res.body.message).to.eq('Wrong password format')
    })
  })
  describe('Registration with existing email', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
          companyName: chance.company(),
          firstName: chance.first(),
          lastName: chance.last(),
          email: process.env.EMAIL,
          password: chance.hash({ length: 10 }),
        })
    })
    it('Response status code is 409', () => {
      expect(res.statusCode).to.eq(409)
    })
    it('Response body returns an error message', () => {
      expect(res.body.message).to.eq('User with this e-mail exists')
    })
  })
})
