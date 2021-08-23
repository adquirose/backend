import express from 'express'
import fs from 'fs'
import { random, borrar, actualizar, existeId } from '../util'
const router = express.Router()

router.get('/vista', (req, res) => {
    fs.promises.readFile('./productos.json')
        .then(data => {
            let productos = JSON.parse(data)
            productos.length ? 
                res.render("main", { productos, existeProducto:true }):
                res.render("main",{ error: true })
        }).catch(error => console.log('error al leer archivo'))
}) //devuelve un array de productos, si no hay productos devolvera el objeto { error: 'no hay productos cargados' }

router.get('/listar/:id', (req, res) => {
    fs.promises.readFile('./productos.json')
        .then(data => {
            let productos = JSON.parse(data)
            const id = parseInt(req.params.id,10)
            existeId(productos,id)?
                res.send(...productos.filter( producto => producto.id === id)):
                res.send({ error: 'producto no encontrado' })
                })
        .catch(error => {})
    
})// devuelve producto, si no existe devolvera el objeto { error: 'producto no encontrado' }

router.post('/guardar', (req, res) => {
    fs.promises.readFile('./productos.json')
        .then(data => {
            let productos = JSON.parse(data)
            let { title, price, pathImage } = req.body
            if(title && price && pathImage){
                productos.push({ id:random(1,10000), title, price, pathImage }) 
                fs.promises.writeFile('./productos.json',JSON.stringify(productos))
                    .then(() => {
                        // res.json(productos[productos.length - 1])
                        res.redirect('/')
                        console.log('producto incorporado')
                    })
                    .catch(error => console.log('error de escritura'))
            }else{
                res.send({error:'debes ingresar un producto con price, title y ruta de imagen'})      
            }
        })
        .catch(error => {})
    
})// devuelve producto incorporado

router.put('/actualizar/:id', (req, res) => {
    fs.promises.readFile('./productos.json')
        .then(data => {
            let productos = JSON.parse(data)
            let id = parseInt(req.params.id,10)
            if(existeId(productos,id)){
                const productoActualizado = actualizar(req.body, productos, id)
                console.log(productoActualizado)
                fs.promises.writeFile('./productos.json',JSON.stringify(productos))
                    .then(()=> res.send(productoActualizado))
                    .catch((error) => console.log('error de escritura'))
            }else{
                res.send({error:'error en la actualizacion'})
            }
        })
})// devuelve producto actualizado

router.delete('/borrar/:id', (req, res) => {
    fs.promises.readFile('./productos.json')
        .then(data => {
            let productos = JSON.parse(data)
            let id = parseInt(req.params.id,10)
            if(existeId(productos,id)){
                let productoEliminado = borrar(productos, id)
                fs.promises.writeFile('./productos.json',JSON.stringify(productos))
                    .then(()=> res.json(productoEliminado))
                    .catch((error) => console.log('error de escritura'))
            }else{
                res.json({ error:'id invalido' })
            }
        })   
})// devuelve producto eliminado
export default router