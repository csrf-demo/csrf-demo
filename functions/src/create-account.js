import admin from 'firebase-admin'
import credentials from './lib/credentials'
import generateSpam from './lib/generate-spam'
import nodemailer from 'nodemailer'

// create a reusable email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: credentials.gmail
})

export default async function (event) {
  const user = event.data

  // set inital balance to onehundered
  await admin.database().ref(user.uid).set(100)

  // genrate random email
  const email = generateSpam()

  // send spam email
  await transporter.sendMail({
    from: `${email.from} <${credentials.gmail.user}>`,
    to: user.email,
    subject: email.subject,
    html: email.template
  })
}
