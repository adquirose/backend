const express = require('express')
const app = express()
const cors = require('cors')
import productos from './routes/productos.routes.js'
import carrito from './routes/carrito.routes.js'

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())

app.use('/', express.static(__dirname + '/public')) 
app.use('/api/productos', productos)
app.use('/api/carrito', carrito)
app.listen('8080', () => {
    console.log('escuchando en el puerto 8080...')
})