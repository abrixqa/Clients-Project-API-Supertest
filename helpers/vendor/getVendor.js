import request from 'supertest'
const chance = require('chance').Chance()

export async function getVendorByName(vendorName) {
  return request(process.env.BASE_URL)
    .post('/v5/vendor/search')
    .set('Authorization', process.env.TOKEN)
    .send({ name: vendorName })
}

export async function getVendorById(id) {
  return request(process.env.BASE_URL)
    .post(`/v5/vendor/${id}`)
    .set('Authorization', process.env.TOKEN)
}

export async function getAllVendors() {
  return request(process.env.BASE_URL)
    .post('/v5/vendor/search')
    .set('Authorization', process.env.TOKEN)
}
