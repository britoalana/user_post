const { randomUUID } = require('crypto')
const express = require('express')
const rota = express.Router()
const path = require('path')
const basepath = path.join(__dirname, '../templates')

const usuarios = []

rota.get('/cadastroUsuario', (req, res) => {
    res.sendFile(`${basepath}/cadastroUsuario.html`)
})

rota.get('/visualizarUser', (req, res) =>{
    res.json(usuarios)
    res.sendFile(`${basepath}/visualizarUser.html`)
})

rota.post('/cadastroUsuario/save', (req, res) => {
    const { nome, user, idade, email } = req.body

    const usuario = {
        id: randomUUID(),
        nome: nome,
        user: user,
        idade: idade,
        email: email
    }

    usuarios.push(usuario)
    return res.json(usuarios)
})

rota.get('/cadastroUsuario', (req, res) => {
    return res.json(usuarios)
})

rota.delete('/visualizarUser/:id', (req, res)=>{
    const {id} = req.params
    const usuario = usuarios.findIndex((usuario) => usuario.id === id)
    usuarios.splice(usuario, 1)
    return res.json({'message': 'Usuário deletado'})
})
rota.put('/visualizarUser/:id', (req, res) => {
    const { id } = req.params
    const { nome, user, idade, email } = req.body
    const userIndex = usuarios.findIndex((usuario) => usuario.id === id)

    if (userIndex === -1) {
        return res.status(404).json({ message: "Produto não encontrado" })
    }
    const userAtt = {
        id,
        nome,
        user,
        idade,
        email
    }

    usuarios[userIndex] = userAtt
    return res.json(userAtt)
})

module.exports = rota