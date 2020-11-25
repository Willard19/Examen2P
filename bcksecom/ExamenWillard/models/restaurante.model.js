var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;

class ProductsModel{
    constructor(){
      this.collection = null
      MongoDB.getDb()
       .then (
         (db)=>{
           this.collection = db.collection("clientes");
         }
      )
       .catch((ex)=>{
        throw(ex);
      });
    }

    async getAll(){
      try {
        let rslts = await this.collection.find({}).toArray();
        return rslts;
      }catch(ex){
        throw(ex);
      }
    }

    async getById(id){
      try{
        const _id = new ObjectID(id);
        let oneDoc = await this.collection.findOne({_id});
        return oneDoc;
      }catch(ex){
        throw(ex);
      }
    }
    async addOne( document ) {
      try{
        var result = await this.collection.insertOne(document);
        return result;
      }catch(ex){
        throw(ex);
      }
    }

    async updateById(id, stock, sales){
      try{
        const _id = new ObjectID(id);
        // UPDATE TABLE SET attr = val, attr = val where attr = val;
        const updOps = {"$set":{"stock":stock, "sales":sales}};
        let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal:false});
        return updDoc;
      }catch(ex){
        throw(ex);
      }
    }
    async removeById(id) {
      try{
        const _id = new ObjectID(id);
        let rslt = await this.collection.deleteOne({_id});
        return rslt;
      }catch(ex){
        throw(ex);
      }
    }
    
}
module.exports = ProductsModel;


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