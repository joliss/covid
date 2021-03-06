const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const View = use('View')

  View.global('NODE_ENV', use('Env').get('NODE_ENV'))
  View.global('SOURCE_VERSION', process.env.SOURCE_VERSION || 'missing')

  View.global('encodeURIComponent', encodeURIComponent)
  View.global('formatNumber', (n) =>
    n == null ? 'null' : n.toLocaleString('en-US')
  )
})
