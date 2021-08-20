export function borrar(arr,i){
    let indice = arr.findIndex( prod => prod.id === i)
    if(indice !== -1){
        let eliminado = arr[indice]
        arr.splice(indice,1)
        return eliminado   
    }
}
export function random(min,max){
    return Math.floor(Math.random()* (max-min)) + min
}
export function existeId(arr,i){
    const res = arr.find( el => el.id === i)
    return res
}
export function actualizar(obj,arr,i){
    let nuevoObj = { id: i, title: obj.title, price:obj.price }
    borrar(arr,i)
    arr.push(nuevoObj)
    return nuevoObj
}