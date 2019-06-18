module.exports = function (app) {
  app.get('/dash', (req, res) => {
    res.render('dash.html', {
      title: 'Dashboard',
      content: {foo: 'bar'}
    })
  })
}
