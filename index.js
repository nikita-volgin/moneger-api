function isEmpty(value) {
    return Object.keys(value).length === 0
}

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('42141254')
})

app.get('/home/:id', (req, res) => {
    res.send(`it's home page ${req.params.id}`)
})

app.post('/', (req, res) => {
    if (isEmpty(req.body)) {
        res.status(400).send('Нет содержимого')
        return
    }

    res.status(200).send(req.body)
})

app.listen(4321, () => {
    console.log('i\'m alive')
})