import {request, Router} from "express"
import authMiddleware from '../middleware/auth.js'
import userMiddleware from '../middleware/user.js'
import Product from "../models/Product.js";

const router = Router()

router.get('/', async (req, res) =>{
    const products = await Product.find().lean()

    res.render('index', {
        title:'Boom shop | Jamshid',
        products:products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
    })
})

router.get('/products', async (req,res) =>{
    const user =  req.userId ? req.userId.toString() : null
    const myProducts = await Product.find({user}).populate('user').lean()

    res.render('products',{
        title:'Products | Jamshid',
        isProducts:true,
        myProducts: myProducts
    })
})
router.get('/add', authMiddleware, (req,res) =>{

    res.render('add', {
        title:'Add products',
        isAdd:true,
        errorAddProducts:req.flash('errorAddProducts')
    })
})

router.get('/product/:id', async (req,res) =>{
    const id = req.params.id
    const product = await Product.findById(id).populate('user').lean()

    res.render('product',{
        product:product,
    })
})

router.post('/add-products', userMiddleware, async (req, res) =>{
    const {title, description, image, price}=req.body
    if (!title || !description || !image ||!price ){
        req.flash('errorAddProducts', "All fields is required")
        res.redirect('/add')
        return
    }

    console.log(req.userId)
    await Product.create({...req.body, user:req.userId})
    res.redirect('/')
})

export default router