import express from 'express'
import productos from './rutas/productos.route'
import handlebars from 'express-handlebars'

const app = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.listen('8080', () => {
    console.log('escuchando en el puerto 8080...')
})


// handlebars
app.engine(
    "hbs",
    handlebars(
        {
            extname:".hbs",
            defaultLayout:"index",
            layoutsDir:__dirname + "/views/layouts",
            partialsDir:__dirname + "/views/partials"
        }
    )
)
app.set("views", "./views")
app.set("view engine", "hbs")
app.use('/', express.static(__dirname + '/public')) 
app.use('/api/productos', productos)
