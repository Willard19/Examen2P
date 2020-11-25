// {{host}}/api/productos/
const express = require("express");
let router = express.Router();


//let clienteModel = require('../../models/restaurante.model')();

const ClienteModelClass = require('../../models/restaurante.model');
const mdbClienteModel = new ClienteModelClass();

router.get('/all', async (req, res)=>{
  try{
    const rslt = await mdbProductModel.getAll()
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({"msg":"Algo Paso Mal."});
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    let oneDocument = await mdbProductModel.getById(id);
    res.status(200).json(oneDocument);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
  
});


router.post('/new', async (req, res)=>{
  try{
    let { sku, name, price, stock=0} = req.body;
    price = Number(price);
    stock = Number(stock);
    var rslt = await mdbProductModel.addOne({ sku, name, price, stock}); // {sku: sku, name:name, price:price, stock:0}
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.put('/upd/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    //id = Number(id);
    let {stock, sales} = req.body;
    sales = Number(sales);
    stock = Number(stock);
    let rslt = await mdbProductModel.updateById(id, stock, sales);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});


router.delete('/del/:id',async (req, res)=>{
  let {id} = req.params;
  try{
    let rslt = await mdbProductModel.removeById(id);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

module.exports = router;

/*
Se requiere capturar:

Nombre de Cliente
Correo del Cliente
Teléfono
Producto
Forma de Pago
Estado de la Orden
Rubrica

Repositorio en Git  con un commit por cada ruta 10Pts
Ruta para Obtener Todas la Ordenes GET  20Pts
Ruta para Obtener Una Orden GET 20Pts
Ruta para Crear Nueva Orden POST 20Pts
Ruta para cambiar el estado de una Orden PUT 20Pts
Colección de POSTMAN 10Pts
*/