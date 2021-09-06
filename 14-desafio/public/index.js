document.addEventListener('DOMContentLoaded', function(){
    const socket = io()
    const addMessage = () => {
        let d = new Date 
    
        let message = {
            author: document.querySelector('#email').value,
            date: [d.getMonth()+1, d.getDate(), d.getFullYear()].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds()].join(':'),
            text: document.querySelector('#text').value
        }
        socket.emit('new-message',message)
        document.querySelector('#email').value = ""
        document.querySelector('#text').value = ""
    }
    document.querySelector('#form-message').addEventListener('submit',function(e){
        e.preventDefault()
        if(document.querySelector('#email').value !== ''){
            addMessage()
        }else{
            document.querySelector('#email').focus()
        }
    })
    
    const renderMessages = (data) => {
        let html = data.map(e => 
            (`<div>
                <strong style="color:blue;">${e.author}</strong>
                <span>${e.date}: </span>
                <em style="color:green;">${e.text}</em>
            </div> `)
        ).join(" ")
        document.querySelector('#messages').innerHTML = html
    }
    socket.on('messages', data => {
        renderMessages(data)
    })

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
        console.log(data)
        render(data)
    })

    const addProducto = () => {
        let item = {
            title: document.querySelector('#title').value,
            price: document.querySelector('#price').value,
            thumbnail: document.querySelector('#thumbnail').value
        }
        console.log(item)
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
        }).then(text => {
            socket.emit('update', 'ok')
        }).catch(err => {
            console.log(err)
        })
    };
})