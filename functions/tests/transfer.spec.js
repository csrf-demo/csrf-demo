import admin from 'firebase-admin'
import credentials from '../src/lib/credentials'
import firebase from 'firebase'
import transfer from '../src/transfer'

test('should transfer money', async function () {
  admin.initializeApp({
    credential: admin.credential.cert(credentials.serviceAccount),
    databaseURL: credentials.firebase['database_url']
  })

  const client = firebase.initializeApp({
    apiKey: credentials.firebase['web_api_key'],
    authDomain: credentials.firebase['auth_domain']
  })

  const senderEmail = 'sender@firebase.test'
  const receiverEmail = 'receiver@firebase.test'
  const amount = 25.00

  // create users
  const sender = await client.auth().signInWithEmailAndPassword(senderEmail, 'password')
  const receiver = await admin.auth().getUserByEmail(receiverEmail)

  // create entrty
  admin.database().ref(sender.uid).update({ balance: 100 })
  admin.database().ref(receiver.uid).update({ balance: 100 })

  // make transfer
  await transfer(
    { query: { token: await sender.getToken(), to: receiverEmail, amount } },
    { send: () => undefined }
  )

  // fetch data snapshots of both parties
  const senderSnapshot = await admin.database().ref(sender.uid).once('value')
  const receiverSnapshot = await admin.database().ref(receiver.uid).once('value')

  // verify balances of both parties
  expect(senderSnapshot.val().balance).toBe(75)
  expect(receiverSnapshot.val().balance).toBe(125)
})
