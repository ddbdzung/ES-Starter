const httpStatus = require('http-status')

const catchAsync = require('../helpers/catchAsync')
const { errorResponseSpecification } = require('../helpers/errorResponse')
const httpResponse = require('../helpers/httpResponse')
const postService = require('../services/post.service')

const defaultIndex = 'demo'

const importPorts = catchAsync(async (req, res) => {
  const q = 'technology'
  const sources = 'techcrunch'
  const domains = 'https://techcrunch.com/'
  const data = await postService.generateMockNews(q, sources, domains)

  res.json(data)
})

const createPosts = catchAsync(async (req, res) => {
  const { articles: rawArticles } = req.body

  const cleanArticles = rawArticles.map(article => ({
    message: article?.content,
    title: article?.title,
    author: article?.author,
    link: article?.url,
    create_time: article?.publishedAt,
  }))

  try {
    const rawPostsInDB = await postService.savePostsToMongoDB(cleanArticles)
    const cleanPostsInDB = rawPostsInDB.map(post => {
      const { __v, _id, ...cleanedPost } = post._doc
      cleanedPost.id = _id.toString()
      return cleanedPost
    })
    await postService.insertToES(defaultIndex, cleanPostsInDB)

    httpResponse(res, httpStatus.CREATED, httpStatus[201])
  } catch (err) {
    errorResponseSpecification(err, res)
  }
})

const updatePost = catchAsync(async (req, res) => {
  const { post } = req.body
  const { id } = req.params
  if (post.hasOwnProperty('id')) {
    delete post.id
  }

  try {
    await postService.updateToESById(defaultIndex, id, post)
    await postService.updatePostById(id, post)

    httpResponse(res, httpStatus.OK, httpStatus[200])
  } catch (err) {
    errorResponseSpecification(err, res, [httpStatus.NOT_FOUND])
  }
})

module.exports = {
  importPorts,
  createPosts,
  updatePost,
}
