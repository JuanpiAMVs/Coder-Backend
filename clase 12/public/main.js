const socket = io()
moment().format(); 
let timeMessage = moment() 
let messages = []
let products = []

function sendNewMessage(){
    const message = document.querySelector('#message').value;
    const email = document.querySelector('#email').value;
    if(!message || !email){
        alert('Faltan datos')
        return
    }
    const messageObject = {
        email,
        message
    }
    socket.emit('NEW_MEESAGE_TO_SERVER', messageObject);
    document.querySelector('#message').value = ""
}

function updateMessages(data){
    let messagesToHtml = ""
    data.forEach(i => {
        messagesToHtml = messagesToHtml + `<li class="border rounded border-primary px-2 my-1"> <p class="text-primary">${i.email} [${timeMessage.format('DD-MM-YYYY')}]</p> <p> ${i.message}</p></li>`
    });
    document.querySelector('#messagesList').innerHTML = messagesToHtml;
}

socket.on('UPDATE_DATA_MSG', (data) => {
  messages = data
  updateMessages(data)
})

socket.on('NEW_MESSAGE_FROM_SERVER', (data) => {
    messages.push(data)
    updateMessages(messages)
})

function sendNewProduct(){
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    if(!name || !price){
        alert('Faltan datos')
        return
    }
    const productObject = {
        name,
        price
    }
    socket.emit('NEW_PRODUCT_TO_SERVER', productObject);
    document.querySelector('#name').value = ""
    document.querySelector('#price').value = ""
}

function updateProducts(data){
    let productsToHtml = ""
    let number = 0
    data.forEach(i => { 
        if(i.name || i.price){
            productsToHtml = productsToHtml + `
            <tbody>
            <tr>
              <th scope="row">${number++}</th>
              <td>${i.name}</td>
              <td> $${i.price}</td>
            </tr>
          </tbody>`
        }
    });
    document.querySelector('#productsList').innerHTML = productsToHtml;
}

socket.on('UPDATE_DATA_PROD', (data) => {
    products = data
    updateProducts(data)
  })

  socket.on('NEW_PRODUCT_FROM_SERVER', (data) => {
    products.push(data)
    updateProducts(products)
})