import { randomEmail } from '../helpers/general-helper'
import {
  createClient,
  getClientById,
  getClientByName,
  updateClient,
} from '../helpers/client-helper'
import { expect } from 'chai'
const chance = require('chance').Chance()

describe('Client tests', () => {
  describe('Create new client', () => {
    let res
    before(async () => {
      res = await createClient()
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
  describe('Get all clients', () => {})
  describe('Get client by ID', () => {})
  describe('Get client by name', () => {
    describe('Get client by correct name', () => {
      let res
      const clientName = chance.name()
      before(async () => {
        await createClient(clientName, chance.phone(), randomEmail())
        res = await getClientByName(clientName)
        console.log(res.body)
      })
      it('Response status code is 200', () => {
        expect(res.statusCode).to.eq(200)
      })
      it('Response body return correct message Get ClientSearch ok', () => {
        expect(res.body.message).to.eq('ClientSearch ok')
      })
      it('Response body returns correct number of found clients', () => {
        expect(res.body.payload.pager.itemsCount).eq(1)
      })
    })
  })
  describe('Update client', () => {
    let clientId
    let res
    const clientName = 'Anna Smith'
    const clientPhone = '555555'
    let response
    let getClientRes

    before(async () => {
      clientId = (
        await createClient(chance.name(), chance.phone(), randomEmail())
      ).body.payload
      res = await getClientById(clientId)
      response = await updateClient(clientName, clientPhone, clientId)
      getClientRes = await getClientById(clientId)
      console.log(res.body, clientName, clientPhone, clientId)
      console.log(getClientRes.body)
    })
    it('Response status code is 200', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Response message is Client updated', () => {
      expect(res.body.message).to.eq('Client updated')
    })
    it('Verify the updated client name', () => {
      expect(getClientRes.body.payload.name).to.eq(clientName)
    })
  })
  describe('Delete client', () => {
    describe('Delete client with valid id', () => {})
    describe('Delete client with invalid id', () => {})
    describe('Delete client with no id', () => {})
  })
})
