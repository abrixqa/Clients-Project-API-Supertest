import 'dotenv/config'
import { login } from '../helpers/general-helper'
before(async () => {
  let res = await login(process.env.EMAIL, process.env.PASSWORD)
  process.env.TOKEN = res.body.payload.token
})
