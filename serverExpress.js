import express from "express"
import productRouter from "./src/routes/product-router.js"
import cartRouter from "./src/routes/cart-router.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () =>{console.log("Servidor iniciado en el puerto ", PORT )})

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)