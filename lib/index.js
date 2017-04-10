const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const passwordBuffer = fs.readFileSync(path.resolve(__dirname, '../password'))
const password = passwordBuffer.toString().trim()

const transporter = nodemailer.createTransport({
  service: 'AOL',
  auth: {
    user: 'csrf.demo@aol.com',
    pass: password
  }
})

const emails = ['nbreaton+one@uncc.edu', 'nbreaton+two@uncc.edu']

const messages = emails.map((email) => {
  return transporter.sendMail({
    from: 'Test Sender <csrf.demo@aol.com>',
    to: email,
    subject: 'Test Subject',
    html: `
      <html>
        <body>
          Hello, world.
        </body>
      </html>
    `
  })
})

Promise.all(messages)
  .then((successes) => {
    successes.forEach((success) => {
      console.log(success)
    })
  })
