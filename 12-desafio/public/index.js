document.addEventListener('DOMContentLoaded', function(){
    const socket = io()
    document.querySelector('form').addEventListener('submit', function(e){
        e.preventDefault()
        addProducto()
        document.querySelector('#title').value=""
        document.querySelector('#price').value=""
        document.querySelector('#thumbnail').value=""
    })
    const render = (data) => {
        let html = data.map( elem => (
            `<tr>
                <th scope="row">${elem.id}</th>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td><img style="width:50px;" src="${elem.thumbnail}"></td>
            </tr>`)
        ).join(" ")
        document.querySelector('#to_render').innerHTML = html
    }
    socket.on('productos', data => {
        render(data)
    })

    const addProducto = () => {
        let item = {
            title: document.querySelector('#title').value,
            price: document.querySelector('#price').value,
            thumbnail: document.querySelector('#thumbnail').value
        };
        socket.emit('item', item);
        return false
    };
})