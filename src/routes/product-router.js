import { Router } from "express";
import { productMgr } from "../../productManager/product.manager.js";
import { productValidator } from "../../middleware/productValidator.js";

const router = Router();

//GetProducts
router.get('/', async (req, res) => {
    try{
        const { limit } = req.query;
        const products = await productMgr.getProducts(limit);
        res.status(200).json(products);
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//GetProductById
router.get('/:pid', async (req, res) => {
    const {pid} = req.params
    try{
        const product = await productMgr.getProductById(pid)
        if(product != -1) {
            res.status(200).json(product)
        } else{
            res.status(404).send("El producto no existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//AddProduct
router.post('/', productValidator,async (req, res) => {
    const newProduct = req.body

    try{
        res.status(200).json(await productMgr.addProduct(newProduct))
    }
    catch(error){
        res.status(404).json({msj:"Error en add product"})
    }
})

//UpdateProduct
router.put('/:pid', async (req, res) => {
    const {pid} = req.params
    const newProductValues = req.body
    try{
        console.log("11");
        const productoActualizado = await productMgr.updateProduct(pid, newProductValues)
        console.log("12");
        if(productoActualizado != -1) {
            res.status(200).json(productoActualizado)
        } else{
            res.status(404).send("El producto no existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//removeProduct
router.delete('/:pid', async (req, res) => {
    const {pid} = req.params
    try{
        const status = await productMgr.removeProduct(pid)
        if(status != -1) {
            res.status(200).json("Producto eliminado con exito")
        } else{
            res.status(404).send("El producto no existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})



export default router