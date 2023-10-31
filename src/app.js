
import express from 'express'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import ProductController from './controllers/productController.js'


const app = express()


app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//handlebars config
app.engine('handlebars',handlebars.engine())
app.set('views', './src/views')

app.set('view engine', 'handlebars')

app.use('/',viewsRouter)


const httpServer = app.listen(8080, () => console.log('RUNNING...'))
const socketServer = new Server(httpServer)

socketServer.on('connection', async socket => {

    console.log('Cliente conectado')

    const PC = new ProductController()

    const products = await PC.getProducts()

    socket.emit('products',products)


    socket.on('new-product', async product => {

        console.log('NEW PRODUCT SOCKET CALL',product)

        const result = await PC.addProduct(product)

        socket.emit('new-product-message', result)
    })

    socket.on('delete-product', async id => {

        console.log('DELETE PRODUCT SOCKET CALL WITH ID',id)

        const result = await PC.deleteProduct(id)

        socket.emit('delete-product-message', result)
    })

})
