

//FALTA ACTUALIZAR MENSAJES DE ERROR//

import fs from "fs"


export class Cart{
    constructor(id,products){
    this.id=id;
    this.products = products;
}}
export class CartManager{

    constructor(){ 
        this.path ="../data/carts.json"}

    addCart = async( 
        )=>{
            const cart= new Cart(
                1,
                []          
            )
        try{    
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const content = JSON.parse(data);
            if (content.length === 0)  cart.id = 1 
            else cart.id =  content.length + 1;
            content.push(cart)
            await fs.promises.writeFile(this.path,JSON.stringify(content,null,'\t'))
        }catch(error){
            const arr = [] 
            arr.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(arr, null, '\t'));
        }
      
    }

    getCartById = async (cartId) =>{
        try {
            const data = await fs.promises.readFile(this.path,'utf-8')
            const carts = JSON.parse(data)
            const cart =carts.find(e => e.id === cartId)
            if(cart) return cart
            else {
                console.log("No hay carrito con ese ID 404")
                return 
        }
        } catch (error) {
            console.error("No existen Carritos 204")
            return  
            
        }
    }

    addProductToCartIdById = async(CartId,ProductId) =>{
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data)
            console.log(carts)
            if (!carts.find(cart=>cart.id === CartId)){ 
                console.log("No existe carrito con ese Id 404")
                return
            }
            else {
                const cart = carts[carts.findIndex(e=>e.id === CartId)]
                console.log(cart)
                const product = cart.products.find(e => e.id === ProductId)
                console.log(product)
                if (product !== undefined){ 
                product.quantity += 1
                console.log("cantidad actualizada 202")
                }
                else {
                    cart.products.push({id:`${ProductId}`, quantity:1})
                    console.log("Producto agregado al carrito 202" + CartId)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carts,null,"\t"))
                }
                return
            } 
        catch(error){
            console.log(error)
            return
        }




    }
    
}

