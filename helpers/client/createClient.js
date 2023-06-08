import request from 'supertest'
const chance = require('chance').Chance()

export async function createClient() {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .set('Authorization', process.env.TOKEN)
    .send({ name: 'Client_' + Date.now(), phone: chance.phone })
}
