import { createClient, randomEmail } from '../helpers/general'
import { expect } from 'chai'
const chance = require('chance').Chance()

describe('Client', () => {
  describe('Create new client', () => {
    let res
    before(async () => {
      res = await createClient(chance.first(), chance.phone(), randomEmail())
    })

    it('Response status code is 200', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Response success message', () => {
      expect(res.body.message).to.eq('Client created')
    })
    it('Response has client ID', () => {
      expect(res.body.payload).to.be.a('string')
    })
  })
})
