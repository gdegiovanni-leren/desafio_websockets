console.log('Script socket.js cargado')

    const socket = io()
    console.log('socket.io init')

    socket.on('products', (products) => {

        let table = document.getElementsByClassName('products-tbody')

        table[0].innerHTML = ''
        if(products && products.length > 0){

            products.forEach((product) => {
               table[0].innerHTML += '<tr>'+
               '<td>'+product.id+'</td>'+
               '<td>'+product.title+'</td>'+
               '<td>'+product.description+'</td>'+
               '<td>'+product.code+'</td>'+
               '<td>'+product.price+'</td>'+
                '<td>'+product.stock+'</td>'+
                '<td>'+product.category+'</td>'+
                '</tr>'
            })
        }
    });


    /* NEW PRODUCT FORM MESSAGES */
    socket.on('new-product-message', data => {
       console.log('message received from new product')
       if(data.status == true){
        setFormSuccess(data.message)
       }else{
        setFormError(data.message)
       }
    });

    function setFormError(error){
        const errorDescription = document.getElementById("error-description")
        errorDescription.innerHTML = '<p>'+error+'</p>'
    }

    function setFormSuccess(message){
        const successDescription = document.getElementById("success-description")
        successDescription.innerHTML = '<p>'+message+'</p>'
        let form = document.getElementById('new-product-form')
        form.reset()
    }
    /****************** */


    /* DELETE PRODUCT MESSAGES */
    socket.on('delete-product-message', data => {
        console.log('message received from delete')
        if(data.status == true){
         setFormDeleteSuccess(data.message)
        }else{
         setFormDeleteError(data.message)
        }
     });

    function setFormDeleteSuccess(message){
        const successDescription = document.getElementById("success-description-delete")
        successDescription.innerHTML = '<p>'+message+'</p>'
        let form = document.getElementById('new-product-form-delete')
        form.reset()
    }

    function setFormDeleteError(error){
        const errorDescription = document.getElementById("error-description-delete")
        errorDescription.innerHTML = '<p>'+error+'</p>'
    }
    /****************** */

    setTimeout(function() {
        /* ADD PRODUCT */
        const submit = document.getElementById("submit-product")

        submit.addEventListener("click", function(event) {

            event.preventDefault()

            const title = document.getElementById('p-title').value
            const description = document.getElementById('p-description').value
            const code = document.getElementById('p-code').value
            const price = document.getElementById('p-price').value
            const stock = document.getElementById('p-stock').value
            const category = document.getElementById('p-category').value

            /*validation*/
            if(!title || title.length <= 0){
                setFormError('ingrese un titulo')
                return
            }
            if(!description || description.length <= 0){
                setFormError('ingrese una descripción')
                return
            }
            if(!code || code.length <= 0){
                setFormError('ingrese un Código')
                return
            }
            if(!price || price.length < 0){
                setFormError('ingrese un precio')
                return
            }
            if(parseFloat(price) == NaN ){
                setFormError('valor del precio incorrecto')
                return
            }
            if(!stock || stock.length < 0){
                setFormError('ingrese stock')
                return
            }
            if(parseInt(stock) == NaN ){
                setFormError('valor del stock incorrecto')
                return
            }
            if(!category || category.length < 0){
                setFormError('ingrese una categoría')
                return
            }

            const product = {
                title : title,
                description: description,
                code: code,
                price: price,
                status: true,
                stock : stock,
                category: category,
                thumbnails : []
            }

            setFormError('')
            setFormSuccess('')

            socket.emit('new-product',product)
        })

        /************ */
        /* DELETE PRODUCT */
        const submitDelete = document.getElementById("submit-product-delete")

        submitDelete.addEventListener("click", function(event) {

            event.preventDefault()

            const id = document.getElementById('p-id').value

            if(!id || id.length <= 0){
                setFormDeleteError('ingrese un ID')
                return
            }
            if(parseInt(id) == NaN ){
                setFormDeleteError('Ingrese un ID correcto')
                return
            }

            setFormDeleteError('')
            setFormDeleteSuccess('')

            socket.emit('delete-product',id)
        })

        /**************** */

    },1500)
