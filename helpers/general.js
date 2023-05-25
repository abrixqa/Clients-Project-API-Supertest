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

function emailSearch(email) {
  return request(process.env.BASE_URL).post('/email/search').send({ email })
}

function createClient(name, phone, email) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .set('Authorization', process.env.TOKEN)
    .send({ name, phone, email })
}

export { login, reg, randomEmail, emailSearch, createClient }
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
// function reg(email) {
//   return request(process.env.BASE_URL)
//       .post('/v5/user')
//       .send({
//         firstName: chance.first(),
//         lastName: chance.last(),
//         email,
//         password: process.env.PASSWORD,
//       })
// }
