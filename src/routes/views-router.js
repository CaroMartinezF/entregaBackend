import { Router } from "express";
import { productMgr } from "../../productManager/product.manager.js"

const router = Router()

router.get("/", async (req, res) => {
    const products = await productMgr.getProducts()
    
    res.render("home", {products})
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await productMgr.getProducts()
    
    res.render("realTimeProducts", {products})
})

export default router