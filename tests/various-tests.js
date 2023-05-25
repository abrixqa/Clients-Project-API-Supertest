import request from 'supertest'
import { login, reg, emailSearch } from '../helpers/general'
import { expect } from 'chai'
const chance = require('chance').Chance()
describe('Email verification', () => {
  let user, str, endPoint, res, check
  const newEmail = 'User_' + Date.now() + '@mail.com'

  before(async () => {
    user = await reg(
      chance.first(),
      chance.last(),
      newEmail,
      process.env.PASSWORD
    ) // new user register API call

    str = await emailSearch(newEmail) //  email search API call
    //console.log(str.body)
    endPoint = str.body.payload.items[0].message
      .split('\n')[4]
      .split('https://clientbase.us')[1]

    res = await request(process.env.BASE_URL).get(endPoint).send() // click to link API call

    check = await login(newEmail, process.env.PASSWORD) // login API call
  })
  it('Check the response status', () => {
    expect(res.statusCode).to.eq(200)
  })

  it('Check the response message', () => {
    expect(res.body.message).to.include('confirmed')
  })

  it('Check the role', () => {
    expect(check.body.payload.user.roles).to.include('verified')
  })
})

describe('Space trimming', () => {
  describe('Email space trimming', () => {
    let res
    let email = ' anna' + Date.now() + '@mail.com '

    before(async () => {
      await reg('Anna', 'Smith', email, process.env.PASSWORD)
      res = await login(email, process.env.PASSWORD)
    })
    it('Response status code is 200', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Response body message', () => {
      expect(res.body.message).to.eq('Auth success')
    })
    it('Response success status is true', () => {
      expect(res.body.success).to.eq(true)
    })
    it('Response success contains token', () => {
      expect(res.body.payload.token).to.be.a('string')
    })
    it('Response body does not contain password', () => {
      expect(res.body.payload.user).to.have.property('password', null)
    })
  })
})
