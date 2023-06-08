import request from 'supertest'
const chance = require('chance').Chance()

export async function createService(vendorId) {
  return request(process.env.BASE_URL)
    .post('/v5/service')
    .set('Authorization', process.env.TOKEN)
    .send({
      name: 'Client_' + Date.now(),
      vendor: vendorId,
      vendorPrice: chance.prime(),
      clientPrice: chance.prime(),
    })
}
