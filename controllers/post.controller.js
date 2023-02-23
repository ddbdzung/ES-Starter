const httpStatus = require('http-status')

const ApiError = require('../helpers/ApiError')
const catchAsync = require('../helpers/catchAsync')
const { errorResponseSpecification } = require('../helpers/errorResponse')
const httpResponse = require('../helpers/httpResponse')
const pick = require('../helpers/pick')
const postService = require('../services/post.service')

const importPorts = catchAsync(async (req, res) => {
  const q = 'technology'
  const sources = 'techcrunch'
  const domains = 'https://techcrunch.com/'
  const data = await postService.getNews(q, sources, domains)

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
    await postService.saveNewsToMongoDB(cleanArticles)

    httpResponse(res, httpStatus.CREATED, httpStatus[201])
  } catch (err) {
    errorResponseSpecification(err, res)
  }
})

const test = catchAsync(async (req, res) => {
  const temp = await postService.test()

  res.send(temp)
})

module.exports = {
  importPorts,
  createPosts,
  test,
}
