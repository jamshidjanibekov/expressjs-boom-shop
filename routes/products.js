import {Router} from "express"
const router = Router()

router.get('/', (req, res) =>{
    res.render('index', {
        title:'Boom shop | Jamshid'
    })
})

router.get('/products', (req,res) =>{
    res.render('products',{
        title:'Products | Jamshid',
        isProducts:true,
    })
})
router.get('/add', (req,res) =>{
    res.render('add',{
        title:'Add | Jamshid',
        isAdd:true,
    })
})

export default router