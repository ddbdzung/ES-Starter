const NewsAPI = require('newsapi')

const newsapi = new NewsAPI(process.env?.NEWS_APIKEY)
const { Post } = require('../models')
const ES = require('../config/elasticsearch')

const getNews = async (q, sources, domains, language = 'en') => new Promise((resolve, reject) => {
  newsapi.v2.everything({
    q,
    sources,
    domains,
    language
  })
    .then(response => resolve(response))
    .catch(err => reject(err))
})

const test = async () => {
  return ES.index({
    index: 'game-of-thrones',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })
}

const saveNewsToMongoDB = async (newsList) => {
  return Post.create(newsList)
}

module.exports = {
  getNews,
  test,
  saveNewsToMongoDB,
}
