module.exports = function (app) {
  app.get('/mine', (req, res) => {
    res.render('dash.html', {
      title: 'Dashboard',
      content: {foo: 'bar'}
    })
  })
}
