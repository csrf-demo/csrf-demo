const express = require('express')
const applyMiddleware = require('./applyMiddleware')

const app = express()

applyMiddleware(app)

app.post('/auth', (req, res) => {
  res.end('auth')
})

app.get('/', (req, res) => {
  res.render('pages/login')
})

app.get('/transfer/:amount/to/:recipient', (req, res) => {
  res.render('pages/sent', {
    amount: req.params.amount,
    recipient: req.params.recipient
  })
})

app.listen(8080, () => {
  console.log('Listening at http://localhost:8080')
})
