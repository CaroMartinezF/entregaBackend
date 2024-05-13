import { Router } from "express";
import { cartMgr } from "../../cartManager/cartManager.js"
import { productMgr } from "../../productManager/product.manager.js";

const router = Router();

//Agregar Cart
router.post('/', async (req, res) => {
    try{
        res.status(200).json(await cartMgr.addCart())
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//Cart por Id
router.get('/:cid', async (req, res) => {
    const {cid} = req.params
    try{
        const cart = await cartMgr.getCartProductsById(cid)
        if(cart != -1) {
            res.status(200).json(cart)
        } else{
            res.status(404).send("No existe el cart")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//Agregar PorductById a CartById
router.post('/:cid/product/:pid', async (req, res)=>{
    const {cid, pid} = req.params;
    
    try{
        const product = await productMgr.getProductById(pid);
        if(product === -1){
            res.status(404).send("El producto no existe")
        }else{
            const cart = await cartMgr.addProductToCart(cid, pid)
            if(cart != -1){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }

})




export default router