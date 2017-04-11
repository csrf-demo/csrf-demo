import admin from 'firebase-admin'
import firebase from 'firebase'
import path from 'path'
import transfer from './transfer'

test('should transfer money', async function () {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.resolve(__dirname, '../../adminsdk.key.json')
    ),
    databaseURL: 'https://csrf-demo.firebaseio.com'
  })

  const client = firebase.initializeApp({
    apiKey: 'AIzaSyB80Jkep0vO07Y1BdvgK75Pr9MZy24MdXc',
    authDomain: 'csrf-demo.firebaseapp.com'
  })

  const senderEmail = 'sender@firebase.test'
  const receiverEmail = 'receiver@firebase.test'
  const amount = 25.00

  // create users
  const sender = await client.auth().signInWithEmailAndPassword(senderEmail, 'password')
  const receiver = await admin.auth().getUserByEmail(receiverEmail)

  // create entrty
  admin.database().ref(sender.uid).set(100)
  admin.database().ref(receiver.uid).set(100)

  // make transfer
  await transfer(
    { params: { token: await sender.getToken(), to: receiverEmail, amount } },
    { send: () => undefined }
  )

  // fetch data snapshots of both parties
  const senderSnapshot = await admin.database().ref(sender.uid).once('value')
  const receiverSnapshot = await admin.database().ref(receiver.uid).once('value')

  // verify balances of both parties
  expect(senderSnapshot.val()).toBe(75)
  expect(receiverSnapshot.val()).toBe(125)
})
