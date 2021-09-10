import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
class Carrito{
    constructor(){
        this.carrito = {
            id: uuidv4(),
            timestamp: new Date(),
            productos:[]
        }
    }
    listarAll(){
        return this.carrito.productos.length ? this.carritos.productos : []
    }
    listar(idProducto){
        let prod = this.carrito.productos.filter(producto => producto.id === idProducto);
        return prod ;
    }
    agregar(idProducto){
        let producto
        fs.promises.readFile('./data/productos.json')
            .then( data => {
                let prod = JSON.parse(data)
                producto = prod.filter(p => p.id === idProducto)
                this.carrito.productos = [{...this.carrito.productos}, producto]
            })
            .catch(error => console.log('error agregar carrito', error))
    }
       
    borrar(id){
        let index = this.carrito.findIndex(producto => producto.id === id);
        this.carrito.splice(index, 1);
    }
}
export default Carrito