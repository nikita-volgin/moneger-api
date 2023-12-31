const express = require('express'),
    app = express(),
    routes = require('./src/controllers/index'),
    database = require('./src/utils/db'),
    ServiceError = require('./src/utils/Exception'),
    cors = require('cors'),
    session = require('express-session'),
    checkAuth = require('./src/middleware/check-auth'),
    userRouter = require('./src/controllers/UserController')

const port = 4321

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}))
app.use(userRouter)
app.use(checkAuth, routes)
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