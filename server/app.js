require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./src/router/routes')

require('./config/db')

const app = express()
const port = process.env.PORT || 4000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(routes)

app.listen(port, () => console.log(`Server run in http://localhost:${port}`))

//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im93bHh4QGdtYWlsLmNvbSIsImlhdCI6MTYzMTY2ODMxNSwiZXhwIjoxNjMxNjcxMzE1fQ.Q3O2Sg917_eiEv45Hwpkq9tPYsCmNQUYXdfSVTLprpM