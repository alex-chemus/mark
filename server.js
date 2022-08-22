const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
const PORT = process.env.PORT || 3000

app.use(history())
app.use(express.static('dist'))

app.get('/*', (_, res) => {
  res.sendFile('./dist/index.html')
})

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Server has been started on port ' + PORT)
})
