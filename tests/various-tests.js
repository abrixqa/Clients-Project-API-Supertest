import request from 'supertest'
import { login, reg, emailSearch } from '../helpers/general'
import { expect } from 'chai'
const chance = require('chance').Chance()
describe.only('Email verification', () => {
  let user, str, endPoint, res, check
  const newEmail = 'User_' + Date.now() + '@mail.com'

  before(async () => {
    user = await reg(
      chance.first(),
      chance.last(),
      newEmail,
      process.env.PASSWORD
    ) // new user register API call

    str = await emailSearch(newEmail) // get email API call
    //console.log(str.body)
    endPoint = str.body.payload.items[0].message
      .split('\n')[4]
      .split('https://clientbase.us')[1]

    res = await request(process.env.BASE_URL).get(endPoint).send()

    check = await login(newEmail, process.env.PASSWORD)
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
