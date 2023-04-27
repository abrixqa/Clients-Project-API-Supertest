import request from 'supertest'
import 'dotenv/config'
before(async () => {
  let res = await request(process.env.BASE_URL)
    .post('/v5/user/login')
    .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
  process.env.TOKEN = res.body.payload.token
})
