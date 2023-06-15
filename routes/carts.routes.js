/// Pendiente ///


import  {Router}  from "express";
import  {uploader}  from "../src/utils.js";

import  {CartManager}  from "../src/cartManager.js";

const router = Router();
const cartHandler = new CartManager;



router.post('/',uploader.single('file'),async function(req,res){
  
  await cartHandler.addCart()
  res.send({status:"ok",message:"carrito creado"})

})

router.get('/:cid',uploader.single('file'),async function(req,res){
  let id = parseInt(req.params.cid)
  const cartContent = await cartHandler.getCartById(id)
  res.send({cartContent})
 
})

router.post('/:cid/product/:pid',uploader.single('file'),async function(req,res){
  let CartId = parseInt(req.params.cid)
  let ProductId = parseInt(req.params.pid)
  await cartHandler.addProductToCartIdById(CartId,ProductId)

res.send({status:"ok",message:"producto agregado"})
})
export default router