import * as clientHelper from '../helpers/client-helper'
import { expect } from 'chai'

describe('Client tests', () => {
  describe('Create new client', () => {
    let res
    before(async () => {
      res = await clientHelper.createClient()
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
  describe('Get all clients', () => {
    let res

    before(async () => {
      await clientHelper.createClient()
      res = await clientHelper.getAll()
    })

    it('Check the response status', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('Check the response contains array', () => {
      expect(res.body.payload.items).to.be.a('array')
    })

    it('Check the array elements has id', () => {
      let clientsList = res.body.payload.items
      for (let i = 0; i < clientsList.length; i++) {
        expect(clientsList[i]).has.property('_id')
      }
    })
  })
  describe('Get client by ID', () => {
    let res
    let clientId

    before(async () => {
      clientId = (await clientHelper.createClient()).body.payload
      res = await clientHelper.getClientById(clientId)

      //console.log(res.body, clientId)
    })

    it('Check the response status', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('Check the response message', () => {
      expect(res.body.message).to.eq('Get Client by id ok')
    })

    it('check the response message', () => {
      expect(res.body.payload._id).to.eq(`${clientId}`)
    })
  })
  describe('Get client by name', () => {
    let clientId
    let res
    let clientName
    before(async () => {
      clientId = (await clientHelper.createClient()).body.payload
      clientName = (await clientHelper.getClientById(clientId)).body.payload
        .name
      res = await clientHelper.getClientByName(clientName)
      //console.log(res.body, clientId, clientName)
    })
    it('Response status code is 200', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Response body return correct message Get ClientSearch ok', () => {
      expect(res.body.message).to.eq('ClientSearch ok')
    })
    it('Check the client name', () => {
      expect(res.body.payload.items[0]._id).to.eq(clientId)
    })
  })
  describe('Update client', () => {
    let res
    let clientId

    before(async () => {
      clientId = (await clientHelper.createClient()).body.payload
      res = await clientHelper.updateClient(clientId)

      //console.log(res.body, clientId)
    })

    it('Response status code is 200', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Response message is Client updated', () => {
      expect(res.body.message).to.eq('Client updated')
    })
  })
  describe('check if the name is actually has been updated', () => {
    let clientId
    let nameBefore
    let nameAfter

    before(async () => {
      clientId = (await clientHelper.createClient()).body.payload
      nameBefore = (await clientHelper.getClientById(clientId)).body.payload
        .name
      await clientHelper.updateClient(clientId)
      nameAfter = (await clientHelper.getClientById(clientId)).body.payload.name

      //console.log(clientId, nameBefore, nameAfter)
    })
    it('check the updated name does not equal original name', () => {
      expect(nameAfter).to.not.eq(nameBefore)
    })
  })
  describe('Delete client', () => {
    let res
    let clientId

    before(async () => {
      clientId = (await clientHelper.createClient()).body.payload
      res = await clientHelper.deleteClient(clientId)
    })

    it('check the response status', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check the response message', () => {
      expect(res.body.message).to.eq('Client deleted')
    })
  })
  describe('check if client is actually deleted', () => {
    let res
    let clientId

    before(async () => {
      clientId = (await clientHelper.createClient()).body.payload
      await clientHelper.deleteClient(clientId)
      res = await clientHelper.getClientById(clientId)
    })

    it('check the response status', () => {
      expect(res.statusCode).to.eq(404)
    })

    it('check the response message', () => {
      expect(res.body.message).to.eq('No client for provided id')
    })
  })
})

after('delete all clients', async () => {
  let clientList
  clientList = (await clientHelper.getAll()).body.payload.items
  for (let i = 0; i < clientList.length; i++) {
    await clientHelper.deleteClient(clientList[i]._id)
  }
})
