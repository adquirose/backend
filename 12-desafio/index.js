const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
import productos from './rutas/productos.route'

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use('/', express.static(__dirname + '/public')) 
app.use('/api/productos', productos)

const prod = {
    items:[]
}
let id = 1
io.on('connection', socket => {
    console.log(`Cliente Conectado ${socket.id}`)
    socket.emit('productos', prod.items) 
    
    socket.on('item', data => {
        data.id = id ++
        prod.items.push(data)
        io.emit('productos',prod.items)
    })
})

http.listen('8080', () => {
    console.log('escuchando en el puerto 8080...')
})