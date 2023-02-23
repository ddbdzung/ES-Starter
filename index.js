require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express();
const routes = require('./routes')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use('/api/v1', routes)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const uri = process.env?.NODE_ENV === 'development'
  ? 'mongodb://127.0.0.1:27018/db54'
  : 'mongodb://mongodb_container:27017/db54'

const port = process.env?.PORT ?? 3000
app.listen(port, () => {
  console.log('http://localhost:' + port)
})

mongoose.connect(uri, options).then(() => {
  console.log('Connected to MongoDB')
}).catch(e => {
  console.log(e)
})
