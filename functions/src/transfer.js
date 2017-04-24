import admin from 'firebase-admin'
import cors from 'cors'

export default async function (req, res) {
  // enable CORS
  await new Promise((resolve) => {
    cors({ origin: true })(req, res, resolve)
  })
  
  // fetch users from provided info
  const [ sender, receiver ] = await Promise.all([
    // sender
    admin.auth().verifyIdToken(req.query.token)
      .then(record => record.uid)
      .then(uid => admin.auth().getUser(uid)),
    // receiver
    admin.auth().getUserByEmail(req.query.to)
  ])

  // fetch amount of money from request
  const amount = req.query.amount || 0

  // move money from sender account to receiver account
  await Promise.all(
    [
      { amount: amount * -1, user: sender },
      { amount: amount * 1, user: receiver },
    ]
      .map((data) => {
        return admin.database().ref(data.user.uid).once('value')
          .then(snapshot => snapshot.val().balance)
          .then(value => value + data.amount)
          .then(newValue => admin.database().ref(data.user.uid).update({
            balance: newValue
          }))
      })
  )

  res.send('OK')
}
