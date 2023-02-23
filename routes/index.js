const express = require('express')

const postEndpoint = require('./post.route.js')

const router = express.Router()

const publicRoutes = [
  {
    path: '/posts',
    route: postEndpoint,
  },
]

publicRoutes.forEach(route => {
  router.use(route.path, route.route)
})

module.exports = router
