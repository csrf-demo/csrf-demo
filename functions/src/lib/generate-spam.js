import { resolve } from 'path'
import fs from 'fs'
import juice from 'juice'

const emails = [
  { from: 'Package Tracker', subject: 'Track your Package', template: 'package.html' },
]

export default function () {
  // pick random email
  const index = Math.floor(Math.random() * emails.length)
  const email = Object.assign({}, emails[index])

  // resolve template path
  const templatePath = resolve(__dirname, '../../templates', email.template)

  // fetch corresponding template HTML
  email.template = fs.readFileSync(templatePath).toString()

  // convert styles to inline styles with juice
  email.template = juice(email.template)

  // return chosen email
  return email
}
