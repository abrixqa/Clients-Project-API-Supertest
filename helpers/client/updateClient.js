import request from 'supertest'
const chance = require('chance').Chance()

function updateClient(clientId) {
  return request(process.env.BASE_URL)
    .patch(`/v5/client/${clientId}`) // equivalent to ( + clientId)
    .set('Authorization', process.env.TOKEN)
    .send({ name: 'updatedClient', phone: 'updatedPhone' })
}

export { updateClient }
