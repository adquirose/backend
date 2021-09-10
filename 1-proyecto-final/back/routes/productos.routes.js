import express from 'express'
import Productos from '../class/productos';
const router = express.Router()
const items = new Productos()
const isAdmin = true

router.get('/listar', (req, res) => {
    const productos = items.listarAll();
    const respuesta = [{productos}, {isAdmin}]
    if (productos.length > 0) {
        res.json(respuesta)
    } else {
        res.json([
            { productos:[] },
            { error: 'No hay productos cargados' }
        ])
    }
})

router.get('/listar/:id', (req, res) => {
    const item = items.listar(req.params.id)
    if (item.length) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})
router.post('/agregar', (req, res) => {
    if(isAdmin){
        const prod = items.agregar(req.body);
        res.json(prod)
        res.redirect('/')
    }else{
        res.json({
            error:-1,
            description:'ruta /agregar, método POST no autorizado'
        })
    }
})
router.put('/actualizar/:id', (req, res) => {
    if(isAdmin){
        const item = items.actualizar(req.params.id, req.body)
        if (item) {
            res.json(item)
        } else {
            res.json({
                error: 'El producto no fue encontrado'
            })
        }
    }else{
        res.json({
            error:-1,
            description:'ruta /actualizar, método PUT no autorizado'
        })
    }
})
router.delete('/borrar/:id', (req, res) => {
    if(isAdmin){
        let idProduct = req.params.id;
        const item = items.borrar(idProduct);
        if (item) {
            res.json(item)
        } else {
            res.json({
                error: 'El producto no fue encontrado'
            })
        }
    }else{
        res.json({
            error:-1,
            description:'ruta /borrar, método DELETE no autorizado'
        })
    }
})

export default router