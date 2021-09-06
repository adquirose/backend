"use strict";
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Productos = require('./api/productos');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'));
var items = new Productos();
var router = express.Router();
app.use('/api', router);
router.get('/productos/listar', function (req, res) {
    var productos = items.listarAll();
    if (productos.length > 0) {
        res.json(productos);
    }
    else {
        res.json({
            error: 'No hay productos cargados'
        });
    }
});
router.get('/productos/listar/:id', function (req, res) {
    var item = items.listar(req.params.id);
    if (item) {
        res.json(item);
    }
    else {
        res.json({
            error: 'El producto no fue encontrado'
        });
    }
});
router.post('/productos/guardar', function (req, res) {
    items.guardar(req.body);
    res.redirect('/');
});
router.put('/productos/actualizar/:id', function (req, res) {
    var item = items.actualizar(req.params.id, req.body);
    if (item) {
        res.json(item);
    }
    else {
        res.json({
            error: 'El producto no fue encontrado'
        });
    }
});
router.delete('/productos/borrar/:id', function (req, res) {
    var idProduct = req.params.id;
    var item = items.borrar(idProduct);
    if (item) {
        res.json(item);
    }
    else {
        res.json({
            error: 'El producto no fue encontrado'
        });
    }
});
router.get('/productos/vista', function (req, res) {
    var prods = items.listarAll();
    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});
var messages = [];
io.on('connection', function (socket) {
    console.log("Cliente Conectado " + socket.id);
    socket.emit('productos', items.get());
    socket.on('update', function (data) {
        if (data === 'ok') {
            io.sockets.emit('productos', items.get());
        }
    });
    socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
        console.log(messages);
    });
});
http.listen('8080', function () {
    console.log('escuchando en el puerto 8080...');
});
