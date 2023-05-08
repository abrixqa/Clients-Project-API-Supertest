import { expect } from 'chai'
import { reg, randomEmail, login } from '../helpers/general'
import request from 'supertest'

const chance = require('chance').Chance()
describe('Registration', () => {
  describe('Create registration', () => {
    let res
    before(async () => {
      res = await reg(
        chance.first(),
        chance.last(),
        randomEmail(),
        chance.hash({ length: 10 })
      )
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
  /*describe('Registration with required data only', () => {
      let res
      let newEmail1 = 'user_' + Date.now() + '@mail.com'
      before(async () => {
        res = await reg(newEmail1)
      })

      it('Response status code is 201', () => {
        expect(res.statusCode).to.eq(201)
      })
      it('Response body returns correct message', () => {
        expect(res.body.message).to.eq(
          'User created successfully. Please check your email and verify it'
        )
      })
    })*/
  describe('Registration without first name', () => {
    let res
    before(async () => {
      res = await reg(
        '',
        chance.last(),
        randomEmail(),
        chance.hash({ length: 10 })
      )
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
    before(async () => {
      res = await reg(
        chance.first(),
        '',
        randomEmail(),
        chance.hash({ length: 10 })
      )
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
      res = await reg(
        chance.first(),
        chance.last(),
        '',
        chance.hash({ length: 10 })
      )
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
    before(async () => {
      res = await reg(chance.first(), chance.last(), randomEmail(), '')
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
      res = await reg(
        chance.first(),
        chance.last(),
        process.env.EMAIL,
        chance.hash({ length: 10 })
      )
    })
    it('Response status code is 409', () => {
      expect(res.statusCode).to.eq(409)
    })
    it('Response body returns an error message', () => {
      expect(res.body.message).to.eq('User with this e-mail exists')
    })
  })
})

describe('Get registered users', () => {
  describe('Get user by id', () => {
    let response
    let getUser
    let id
    before(async () => {
      response = await login(process.env.EMAIL, process.env.PASSWORD)
      id = response.body.payload.user._id
      getUser = await request(process.env.BASE_URL)
        .get(`/v5/user/${id}`)
        .set('Authorization', process.env.TOKEN)
      console.log(id)
    })
    it('Response body returns status code 200', () => {
      expect(getUser.statusCode).eq(200)
    })
    it('Response body returns correct message', () => {
      expect(getUser.body.message).eq('User found')
    })
  })
  describe('Get all users', () => {
    let response
    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user/search')
        .send({ limit: 100, page: 1 })
        .set('Authorization', process.env.TOKEN)
    })
    it('Response body returns status code 200', () => {
      expect(response.statusCode).eq(200)
    })
  })
})
