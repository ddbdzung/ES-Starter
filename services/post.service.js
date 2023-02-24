const NewsAPI = require('newsapi')

const newsapi = new NewsAPI(process.env?.NEWS_APIKEY)
const { Post } = require('../models')
const ES = require('../config/elasticsearch')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('http-status')

const generateMockNews = async (q, sources, domains, language = 'en') => new Promise((resolve, reject) => {
  newsapi.v2.everything({
    q,
    sources,
    domains,
    language
  })
    .then(response => resolve(response))
    .catch(err => reject(err))
})

const insertToES = async (index, newsList) => {
  await newsList.forEach(async news => {
    await ES.index({
      index,
      body: news,
    })
  })

  await ES.indices.refresh({ index })
}

const updatePostById = async (id, updatedBody) => Post.findByIdAndUpdate(id, updatedBody)

const updateToESById = async (index, id, post) => {
  const esPostResult = await ES.search({
    index,
    query: {
      match: {
        id,
      }
    },
  })
  const esPost = esPostResult.hits.hits[0]
  if (!esPost) {
    throw new ApiError(httpStatus.OK, 'Post not found')
  }

  const x = await ES.update({
    index,
    id: esPostResult.hits.hits[0]._id,
    // id: '123',
    doc: post,
  })
  console.log(x)
}

const savePostsToMongoDB = async (newsList) => {
  return Post.create(newsList)
}

module.exports = {
  generateMockNews,
  insertToES,
  savePostsToMongoDB,
  updatePostById,
  updateToESById,
}
