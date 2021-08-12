const express = require('express')
const cors = require('cors')
const routes = require('./src/router/routes')

require('./config/db')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(routes)

app.listen(port, () => console.log(`Server run in http://localhost:${port}`))