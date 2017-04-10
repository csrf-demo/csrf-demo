const admin = require('firebase-admin')
const createAccount = require('./lib/create-account')
const functions = require('firebase-functions')
const transfer = require('./lib/transfer')

// authenicate as administrator
admin.initializeApp(functions.config().firebase)

// tiggers when a new user is created
exports.createAccount = functions.auth.user().onCreate(createAccount)

// triggers on request to /transfer
exports.transfer = functions.https.onRequest(transfer)
