import express from "express"
import productRouter from "./src/routes/product-router.js"
import cartRouter from "./src/routes/cart-router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import viewsRouter from "./src/routes/views-router.js"
import { Server } from "socket.io"
import { productMgr } from "./productManager/product.manager.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

const httpServer = app.listen(PORT, () =>{console.log("Servidor iniciado en el puerto ", PORT )})

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)

//HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/src/views`)
app.set('view engine', 'handlebars')

const socketServer = new Server (httpServer)

socketServer.on("connection", async (socket) =>{
    console.log("Usuario Conectado:", socket.id);

    socket.on("disconnect", () =>{
        console.log("Usuario desconectado:", socket.id);
    })
    const products = await productMgr.getProducts()
    socket.emit("getProducts", products )

    socket.on("newProduct", async (product) => {
        await productMgr.addProduct(product)
        const products = await productMgr.getProducts()
        socket.emit("getProducts", products )
    })

    socket.on("deleteProduct", async (idToDelete)=>{
        await productMgr.removeProduct(idToDelete)
        const products = await productMgr.getProducts()
        socket.emit("getProducts", products )
    })
})