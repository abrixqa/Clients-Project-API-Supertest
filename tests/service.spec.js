import { service, vendor } from '../helpers/index'
import { expect } from 'chai'
describe('Service', () => {
  describe('Create service', () => {
    let res

    before(async () => {
      let vendorId = (await vendor.createVendor()).body.payload
      res = await service.createService(vendorId)
    })
    it('Check status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('Check response body message', () => {
      expect(res.body.message).to.eq('Service created')
    })

    it('Check if payload type a string', () => {
      expect(res.body.payload).to.be.a('string')
    })

    it('Check if id length is correct', () => {
      expect(res.body.payload).to.lengthOf(24)
    })
  })
})
