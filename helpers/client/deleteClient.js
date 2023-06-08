import request from 'supertest'
const chance = require('chance').Chance()

function deleteClient(clientId) {
  return request(process.env.BASE_URL)
    .delete(`/v5/client/${clientId}`)
    .set('Authorization', process.env.TOKEN)
}

export { deleteClient }
