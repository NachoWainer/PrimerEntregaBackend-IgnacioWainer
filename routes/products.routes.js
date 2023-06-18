import { Router } from "express";
import { ProductManager } from "../src/productManager.js";

const router = Router();
const productHandler = new ProductManager;

router.get('/',async(req,res)=>{
    const limit = req.query.limit
    const data = await productHandler.getProducts()
    if (!limit) return res.send(data)
    else return res.send(data.slice(0,limit))
})
router.get('/:pid',async(req,res)=>{
    let id = parseInt(req.params.pid)
    const {status,message,data} = await productHandler.getProductById(id)
    if (data){
        return res.send({status:status,message:`${message}`,value:data})
    }
        else return res.send({status:status,message:`${message}`,value:data})
        
})

router.post('/',async(req,res)=>{
    const {title, description, code, price, status, stock, category, thumbnail} = req.body
    
    const {stats,message,data} = await productHandler.addProduct(title,description,code,price,status,stock,category,thumbnail)
    res.send({status:stats,message:`${message}`,value:data})
})  

router.put('/:pid',async(req,res)=>{
    let id = parseInt(req.params.pid)
    const {title, description, code, price, status, stock, category, thumbnail} = req.body
    if (title !== undefined) await productHandler.updateProduct(id,"title",title)
    if (description !== undefined) await productHandler.updateProduct(id,"description",description)
    if (code !== undefined) await productHandler.updateProduct(id,"code",code)
    if (price !== undefined) await productHandler.updateProduct(id,"price",price)
    if (status !== undefined) await productHandler.updateProduct(id,"status",status)
    if (stock !== undefined) await productHandler.updateProduct(id,"stock",stock)
    if (category !== undefined) await productHandler.updateProduct(id,"category",category)
    if (thumbnail !== undefined) await productHandler.updateProduct(id,"thumbnail",thumbnail)
    res.send({status:202,message:"ok"})
})
router.delete('/:pid',async(req,res)=>{
    let id = parseInt(req.params.pid)
    await productHandler.deleteProduct(id)
    res.send({status:"Ok"})
})



export default router