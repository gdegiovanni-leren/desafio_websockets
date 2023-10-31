import { Router } from 'express'
import ProductController from '../controllers/productController.js'

const router = Router()


router.get('/', async (req, res) => {

    const PC = new ProductController()

    const products = await PC.getProducts()

    res.render('index', {
        products,
        style: 'index.css',
        title : 'LISTADO DE PRODUCTOS ESTATICO'
    })
})

router.get('/realtimeproducts', async (req,res) => {

    res.render('realTimeProducts', {
        style: 'index.css',
        title : 'LISTADO DE PRODUCTOS WEBSOCKET'
    })

})


export default router