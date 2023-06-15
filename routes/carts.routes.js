/// Pendiente ///


import  {Router}  from "express";
import  {uploader}  from "../src/utils.js";

import  {CartManager}  from "../src/cartManager.js";

const router = Router();
const cartHandler = new CartManager;



router.post('/',uploader.single('file'),async function(req,res){
  
  const {status,message,data} = await cartHandler.addCart()
  res.send({status:status,message:message,value:data})

})

router.get('/:cid',uploader.single('file'),async function(req,res){
  let id = parseInt(req.params.cid)
  const {status,message,data} = await cartHandler.getCartById(id)
  res.send({status:status,message:message,value:data})
 
})

router.post('/:cid/product/:pid',uploader.single('file'),async function(req,res){
  let CartId = parseInt(req.params.cid)
  let ProductId = parseInt(req.params.pid)
  const {status,message,data} = await cartHandler.addProductToCartIdById(CartId,ProductId)

  res.send({status:status,message:message,value:data})
})
export default router