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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsd2FuQGdtYWlsLmNvbSIsImlhdCI6MTYyODk4NTQ0MiwiZXhwIjoxNjI5NTkwMjQyfQ.3j4K4QhiRDUVfd9ZpMU1UcoXgRKgKpb19eOi_70-XrY