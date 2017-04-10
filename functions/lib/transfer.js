const admin = require('firebase-admin')

module.exports = async function (req, res) {
  // fetch users from provided info
  const [ sender, receiver ] = await Promise.all([
    // sender
    admin.auth().verifyIdToken(req.params.token)
      .then(record => record.uid)
      .then(uid => admin.auth().getUser(uid)),
    // receiver
    admin.auth().getUserByEmail(req.params.to)
  ])

  // fetch amount of money from request
  const amount = req.params.amount || 0

  // move money from sender account to receiver account
  await Promise.all(
    [
      { amount: amount * -1, user: sender },
      { amount: amount * 1, user: receiver },
    ]
      .map((data) => {
        return admin.database().ref(data.user.uid).once('value')
          .then(snapshot => snapshot.val())
          .then(value => value + data.amount)
          .then(newValue => admin.database().ref(data.user.uid).set(newValue))
      })
  )

  res.send('OK')
}
