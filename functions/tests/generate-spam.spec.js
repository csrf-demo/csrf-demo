import generateSpam from '../src/lib/generate-spam'

beforeEach(function () {
  this.email = generateSpam()
})

test('should have a sender', function () {
  console.log(this.email.template);
  expect(this.email).toHaveProperty('from')
})

test('should have a subject', function () {
  expect(this.email).toHaveProperty('subject')
})

test('should have HTML template', function () {
  expect(this.email).toHaveProperty('template')
  expect(this.email.template).toMatch(/<html>/)
})
