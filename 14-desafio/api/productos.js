
class Productos{
    constructor(){
        this.productos = []
        this.id = 0
    }
    get(){
        return this.productos
    }
    listarAll(){
        return this.productos.length ? this.productos : { error: 'no hay productos' };
    }
    listar(id){
        let prod = this.productos.filter(prod => prod.id == id);
        return prod || { error: 'producto no encontrado' };
    }
    guardar(prod){
        prod.id = this.id++;
        this.productos.push(prod);
    }
    actualizar(id, prod){
        prod.id = Number(id);
        let index = this.productos.findIndex(prod => prod.id == id);
        this.productos.splice(index, 1, prod);
    }
    borrar(id){
        let index = this.productos.findIndex(prod => prod.id == id);
        return this.productos.splice(index, 1);
    }

}
module.exports = Productos