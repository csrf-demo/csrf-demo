import { resolve } from 'path'
import fs from 'fs'

const credentials = {
  firebase: 'firebase.json',
  gmail: 'gmail.json',
  serviceAccount: 'service-account.json'
}

for (let name in credentials) {
  credentials[name] = require(
    resolve(__dirname, '../credentials', credentials[name])
  )
}

export default credentials
