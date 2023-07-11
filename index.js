const express = require('express'),
    app = express(),
    routes = require('./src/controllers/index'),
    database = require('./src/utils/db'),
    ServiceError = require('./src/utils/Exception'),
    cors = require('cors'),
    session = require('express-session'),
    checkAuth = require('./src/middleware/check-auth')

const port = 4321

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
// app.use(cookieParser())
// app.use((req, res, next) => {
//     console.log('my Nikitosy')
//     next()
// })
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}))
app.use(checkAuth)
app.use(routes)
app.use((err, req, res, next) => {
    if (err instanceof ServiceError) {
        res.status(err.statusCode).send(err.message)
    } else {
        next(err)
    }
})

app.listen(port, async () => {
    try {
        await database.sync()
        console.log('The database was connected')
    } catch(err) {
        console.log(err)
    }
    console.log(`i'm alive! Link: http://localhost:${port}`)
})