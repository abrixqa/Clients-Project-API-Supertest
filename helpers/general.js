import request from 'supertest'

function login(email, password) {
  return request(process.env.BASE_URL)
    .post('/v5/user/login')
    .send({ email, password })
}

function reg(firstName, lastName, email, password) {
  return request(process.env.BASE_URL)
    .post('/v5/user')
    .send({ firstName, lastName, email, password })
}
function randomEmail() {
  return 'User_' + Date.now() + '@mail.com'
}

export { login, reg, randomEmail }
/*
const Chance = require('chance')
const chanceObj = new Chance()

export const reg = email => {
  return request(process.env.BASE_URL)
    .post('/v5/user')
    .send({
      companyName: chanceObj.company(),
      firstName: chanceObj.first(),
      lastName: chanceObj.last(),
      email,
      password: chanceObj.hash({ length: 10 }),
      version: 'v5',
    })
}
*/
