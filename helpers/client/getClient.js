import request from 'supertest'
const chance = require('chance').Chance()

function getClientByName(clientName) {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .send({ name: clientName })
    .set('Authorization', process.env.TOKEN)
}

function getClientById(clientId) {
  return request(process.env.BASE_URL)
    .get(`/v5/client/${clientId}`)
    .set('Authorization', process.env.TOKEN)
}

function getAll() {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .set('Authorization', process.env.TOKEN)
    .send({ limit: 30 })
}

export { getClientByName, getClientById, getAll }
