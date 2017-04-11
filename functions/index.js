// include for async / await support
require("babel-polyfill");
// include libraries
const admin = require('firebase-admin')
const functions = require('firebase-functions')
// include compiled files
const createAccount = require('./dist/create-account').default
const deleteAccount = require('./dist/delete-account').default
const transfer = require('./dist/transfer').default

// authenicate as administrator
admin.initializeApp(functions.config().firebase)

// tiggers when a new user is created
exports.createAccount = functions.auth.user().onCreate(createAccount)

// tiggers when a user is deleted
exports.deleteAccount = functions.auth.user().onDelete(deleteAccount)

// triggers on request to /transfer
exports.transfer = functions.https.onRequest(transfer)
