import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
class Productos{
    constructor(){
        this.productos = fs.promises.readFile('./data/productos.json')
            .then(data => this.productos = JSON.parse(data))
            .catch(error => console.log('error al leer archivo'))
    }
    listarAll(){
        return this.productos.length ? this.productos : { error: 'no hay productos' };
    }
    listar(id){
        let prod = this.productos.filter(producto => producto.id === id);
        return prod ;
    }
    agregar(prod){
        prod.id = uuidv4()
        prod.timestamp = new Date()
        let prodAdd = fs.promises.readFile('./data/productos.json')
            .then(data => {
                this.productos = JSON.parse(data)
                this.productos.push(prod);
                fs.promises.writeFile('./data/productos.json',JSON.stringify(this.productos))
                    .then(() => {
                        console.log('producto agregado')
                    })
                    .catch(error => console.log('error de escritura'))
                return prod
            })
            .catch(error => {})
        return prodAdd
    }
    actualizar(id, prod){
        prod.id = id;
        let index = this.productos.findIndex(producto => producto.id === id);
        this.productos.splice(index, 1, prod)
        fs.promises.writeFile('./data/productos.json',JSON.stringify(this.productos))
            .then(() => {
                console.log(data)
            })
            .catch(error => console.log('error de actualizacion'))
        return this.productos[index]
    }
    borrar(id){
        let index = this.productos.findIndex(producto => producto.id === id);
        this.productos.splice(index, 1);
        fs.promises.writeFile('./data/productos.json',JSON.stringify(this.productos))
            .then(() => {
                console.log('producto borrado')
            })
            .catch(error => console.log('error de actualizacion'))
    }

}
export default Productos