import admin from 'firebase-admin'

export default function (event) {
  const user = event.data
  admin.database().ref(user.uid).set(null)
}
