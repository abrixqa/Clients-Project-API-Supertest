import request from 'supertest'

export async function deleteVendor(id) {
  return request(process.env.BASE_URL)
    .post(`/v5/vendor/${id}`)
    .set('Authorization', process.env.TOKEN)
}
