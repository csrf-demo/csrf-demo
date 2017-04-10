const admin = require('firebase-admin')
const firebase = require('firebase')
const path = require('path')
const transfer = require('./transfer')

test('should transfer money', async function () {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.resolve(__dirname, '../../adminsdk.key.json')
    ),
    databaseURL: 'https://csrf-demo.firebaseio.com'
  })

  this.sender = await admin.auth().getUserByEmail('sender@example.com')
  this.receiver = await admin.auth().getUserByEmail('receiver@example.com')

  const token = await this.sender.createCustomToken()
  const to = this.receiver.email
  const amount = 50

  // create entrty
  admin.database().ref(this.sender.uid).set(100)
  admin.database().ref(this.receiver.uid).set(100)

  // make transfer
  await transfer(
    { params: { token, to, amount } },
    { send: () => undefined }
  )

  // fetch data snapshots of both parties
  const senderSnapshot = await admin.database().ref(this.sender.uid).once('value')
  const receiverSnapshot = await admin.database().ref(this.sender.uid).once('value')

  // verify balances of both parties
  expect(senderSnapshot.val()).toBe(50)
  expect(senderSnapshot.val()).toBe(100)
})
