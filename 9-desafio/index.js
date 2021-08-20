import express from 'express'
import productos from './rutas/productos.route'

const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.listen('8080', () => {
    console.log('escuchando en el puerto 8080...')
})
app.use('/api/productos', productos)
app.use('/', express.static(__dirname + '/public')) // para servir archivos estaticos (imagenes, CSS, JS, etc...)

