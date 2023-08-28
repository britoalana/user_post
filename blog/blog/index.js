const express = require('express')
const app = express()
const porta = 3333
const router = require('./routers/usuario')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(router)


app.listen(porta, () => {
    console.log(`Servidor on na porta ${porta}`)
})