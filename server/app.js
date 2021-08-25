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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsd2FuQGdtYWlsLmNvbSIsImlhdCI6MTYyOTg2NTM2NSwiZXhwIjoxNjI5ODcyNTY1fQ.SQEU-l6QR0raNXhNIP1ghbpjTnm687sWdeBl4wX9maw