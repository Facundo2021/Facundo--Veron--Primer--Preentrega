const ProductManager = require("./productManager")

const express = require("express");

const manager = new ProductManager("./productos.json")

const app = express();

const PORT = 9090;

app.get('/products', async (req, res) => {
    try {
        const arrayProductos = await manager.getProducts();

        let limit = parseInt(req.query.limit)

        if (limit) {
            const arrayConLimit = arrayProductos.slice(0, limit)
            
            return res.send(arrayConLimit);
        } else {
            return res.send(arrayProductos);
        }

    } catch (error) {
        console.log(error)
        return res.send("error al procesar la solicitud")
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        //Usamos query params para tomar el valor de id asignado x url
        let productId = parseInt(req.params.pid)

        const product = await manager.getProductById(productId)

        if (product) {
            res.send(product)
        } else {
            res.status(404).json({ error: 'producto no encontrado' })
        }

    } catch (error) {
        res.status(501).json({ error: 'Producto con id no encontrado' })
    }
})

//iniciamos server
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})




