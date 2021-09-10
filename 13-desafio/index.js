const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const Productos = require('./api/productos')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use('/', express.static(__dirname + '/public')) 

const items = new Productos()
const router = express.Router();
app.use('/api', router);

router.get('/productos/listar', (req, res) => {
    const productos = items.listarAll();
    if (productos.length > 0) {
        res.json(productos)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})

router.get('/productos/listar/:id', (req, res) => {
    const item = items.listar(req.params.id)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.post('/productos/guardar', (req, res) => {
    items.guardar(req.body);
    res.redirect('/')
})

router.put('/productos/actualizar/:id', (req, res) => {
    const item = items.actualizar(req.params.id, req.body)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.delete('/productos/borrar/:id', (req, res) => {
    let idProduct = req.params.id;
    const item = items.borrar(idProduct);
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.get('/productos/vista', (req, res) => {
    let prods = items.listarAll();

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});

let messages= []

io.on('connection', socket => {
    console.log(`Cliente Conectado ${socket.id}`)
    socket.emit('productos', items.get())
    socket.on('update', data => {
        if (data === 'ok') {
            io.sockets.emit('productos', items.get());
        }
    })
    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
        console.log(messages);
    })
})

http.listen('8080', () => {
    console.log('escuchando en el puerto 8080...')
})