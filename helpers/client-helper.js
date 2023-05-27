import request from 'supertest'
const chance = require('chance').Chance()

function createClient() {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .set('Authorization', process.env.TOKEN)
    .send({ name: chance.name(), phone: chance.phone })
}

function getClientByName(clientName) {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .send({ name: clientName })
    .set('Authorization', process.env.TOKEN)
}

function updateClient(clientName, clientPhone, clientId) {
  return process.env.BASE_URL.patch(`v5/client/${clientId}`) // equivalent to ( + clientId)
    .send({ name: clientName, phone: clientPhone })
    .set('Authorization', process.env.Token)
}

function getClientById(clientId) {
  return request(process.env.BASE_URL)
    .get(`/v5/client/${clientId}`)
    .set('Authorization', process.env.TOKEN)
}
function deleteClient(clientId) {
  return request(process.env.BASE_URL)
    .delete(`/v5/client/${clientId}`)
    .set('Authorization', process.env.TOKEN)
}

function getAll() {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .set('Authorization', process.env.TOKEN)
    .send({ limit: 30 })
}

export {
  createClient,
  getClientByName,
  updateClient,
  deleteClient,
  getClientById,
  getAll,
}
