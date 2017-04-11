import admin from 'firebase-admin'
import credentials from './credentials'
import nodemailer from 'nodemailer'

// create a reusable email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: credentials.gmail
})

export default async function (event) {
  const user = event.data

  // set inital balance to zero
  await admin.database().ref(user.uid).set(100)

  // send spam email
  await transporter.sendMail({
    from: `Test Sender <${credentials.gmail.user}>`,
    to: user.email,
    subject: 'Hello from Firebase',
    html: `
      <html>
        <body>
          Hello, world.
        </body>
      </html>
    `
  })
}
