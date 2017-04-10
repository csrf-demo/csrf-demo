const { resolve } = require('path')
const hbs = require('hbs')

module.exports = function (app) {
  // VIEW ENGINE
  // set view engine
  app.set('view engine', 'hbs')
  // set views location
  app.set('views', resolve(__dirname, '../views'))
  // set partials location
  hbs.registerPartials(resolve(app.get('views'), 'partials'))
}
