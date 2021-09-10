import express from "express";
import Carrito from "../class/carrito";
const router = express.Router();
const carrito = new Carrito();

router.get("/listar", (req, res) => {
    const productos = carrito.listarAll();
    if (productos.length > 0 ) {
        res.json(productos);
    } else {
        res.json({ error: "No hay productos en el carrito" });
    }
});

router.get("/listar/:id", (req, res) => {
    const item = carrito.listar(req.params.id);
    if (item.length) {
        res.json(item);
    } else {
        res.json({
            error: "El producto no fue encontrado",
        });
    }
});
router.get("/agregar/:id", (req, res) => {
    const prod = carrito.agregar(req.params.id);
    res.json(prod);
    res.redirect("/");
});
router.delete("/borrar/:id", (req, res) => {
    let idProduct = req.params.id;
    const item = carrito.borrar(idProduct);
    if (item) {
        res.json(item);
    } else {
        res.json({
            error: "El producto no fue encontrado",
        });
    }
});

export default router;
