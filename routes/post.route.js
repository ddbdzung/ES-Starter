const express = require('express')

const validate = require('../middlewares/validate.middleware')
const postController = require('../controllers/post.controller')
// const { postValidation } = require('../validations/index')

const router = express.Router()

router.get(`/mocks`, postController.importPorts)
router.get(`/test`, postController.test)
router.post(`/`, postController.createPosts)

module.exports = router
