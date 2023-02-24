const { Client } = require('@elastic/elasticsearch')

// Cloud ES
// const client = new Client({
//   cloud: {
//     id: 'b64cceb42cff48619a07a1e5ef33c88b:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDg4YjE2ZmRhZjU4ZTRhNmE4ZWY2ZWM2OGU4YzhiMWU4JDQwNWRiYmI5ZWRlYjQwNjdhMmY2MTdjZGIwM2Y3NGZj',
//   },
//   auth: {
//     username: 'elastic',
//     password: 'Bg0sc8k4ldQUsPgyqriwgIYX'
//   }
// })

// Local ES
const client = new Client({
  node: 'http://localhost:9200',
})

module.exports = client
