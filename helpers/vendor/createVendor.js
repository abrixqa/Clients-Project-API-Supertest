import request from 'supertest'
const chance = require('chance').Chance()

export async function createVendor() {
  return request(process.env.BASE_URL)
    .post('/v5/vendor')
    .set('Authorization', process.env.TOKEN)
    .send({ name: 'Client_' + Date.now(), phone: chance.phone })
}
