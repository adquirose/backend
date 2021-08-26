import express from 'express'
import productos from './rutas/productos.route'

const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.listen('8080', () => {
    console.log('escuchando en el puerto 8080...')
})
app.set("views", "./views")
app.set("view engine", "pug")
app.use('/', express.static(__dirname + '/public')) 
app.use('/', productos)
