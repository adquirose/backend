document.addEventListener('DOMContentLoaded', function(){
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
    const addProducto = () => {
        let item = {
            title: document.querySelector('#title').value,
            price: document.querySelector('#price').value,
            thumbnail: document.querySelector('#thumbnail').value
        };
        fetch('/api/productos/guardar',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item)
        }).then(response => {
            if(response.ok){
                return response.text()
            }
        }).catch(err => {
            console.log(err)
        })
        return false
    };
})