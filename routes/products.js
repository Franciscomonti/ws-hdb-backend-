import  express  from 'express';
import controller from '../controller/productsController.js'

const router = express.Router();

router.get('/', controller.getAllProducts)


router.get('/realtimeproducts', (req, res) => {
    res.status(200).render('realTimeProducts')
})

export default router;