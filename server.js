import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Lista usuários
app.get('/usuarios', async (req, res) => {
    let users = []

    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }
    
    res.status(200).json(users)
    }
)

// Cria usuário
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name:   req.body.name,
            age:    req.body.age,
            email:  req.body.email
        }
    })

    res.status(201).json({ message: 'Usuário criado com sucesso.'})
    }
)

// Modifica usuário
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
            name:   req.body.name,
            age:    req.body.age,
            email:  req.body.email
        }
    })
    
    res.status(201).json({ message: 'Usuário modifcado com sucesso.'})
    }
)

// Exclui usuário
app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    
    res.status(201).json({ message: 'Usuário excluído com sucesso.'})
    }
)

app.listen(3000)

/*
    Mongodb: estudos / hqqwv2hAAocvUHKO
    app.post('/usuarios')
    app.put('/usuarios')
    app.delete('/usuarios')
*/

/*
    1) Tipo de rota / Método http
    2) Endereço (caminho?)
*/