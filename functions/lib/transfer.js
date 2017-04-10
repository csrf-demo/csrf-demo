const admin = require('firebase-admin')

module.exports = function (req, res) {
  const user = admin.auth().verifyIdToken(req.params.token)
  console.log(user);
}
