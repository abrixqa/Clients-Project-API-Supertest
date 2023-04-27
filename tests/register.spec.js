import { expect } from 'chai'
import { reg, randomEmail } from '../helpers/general'

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
