import fs from "fs"
export class Product{
    constructor(id,title,description,code,price,status,stock,category,thumbnail){
    this.id=id;
    this.title=title;
    this.description=description;
    this.code=code;
    this.price=price;
    this.status=status;
    this.stock=stock;
    this.category=category;
    this.thumbnail=thumbnail;
}}
export class ProductManager{

    constructor(){ 
        this.path ="../data/products.json"}

    addProduct = async( 
        title, description, code, price, status, stock, category, thumbnail
        )=>{
            if (title === undefined || description === undefined || status === undefined || category === undefined || price === undefined ||
                code === undefined || stock === undefined) {
              console.error("Los productos a agregar deben incluir 7 campos: title, description, price, code, stock. El campo thumbnail es opcional");
              return;
            }
            const product= new Product(
                1,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail
            )
        try{    
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const content = JSON.parse(data);
        
            if (content.find(element => element.code === code)) {
                console.error("el codigo ya esta en uso 403")
                return
            }
            if (content.length === 0)  product.id = 1 
            else product.id =  content.length + 1;
            content.push(product)
 
            await fs.promises.writeFile(this.path,JSON.stringify(content,null,'\t'))
        }catch(error){
            const arr = [] 
            arr.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(arr, null, '\t'));
        }
      
    }

    getProducts=async()=> {
        try{
            const data = await fs.promises.readFile(this.path,'utf-8')  
            const product = JSON.parse(data)
            return product
            }
        catch(error){
            console.error("No existen productos 404")
            return 
            }
        }

    
    getProductById = async (productId) =>{//LISTO
        try {
            const data = await fs.promises.readFile(this.path,'utf-8')
        
            const products = JSON.parse(data)
            if(products.find(e => e.id === productId)) {
                return {status:202,message:"Producto encontrado",value:products.find(e => e.id === productId)}}
            else {
                return {status:404,message:"No hay productos con ese ID 404",value:[]}
        }
        } catch (error) {
            return{status:404,message:"No existen productos",value:[]}
            
        }
    }

    updateProduct = async(productId, prop , value) =>{
       
        if ("title" === prop || "description" === prop || "price" === prop ||
            "thumbnail" === prop || "code" === prop || "stock" === prop
            || "category" === prop || "status" === prop){
            try {
                const data =await  fs.promises.readFile(this.path,'utf-8')
        
                const products = JSON.parse(data)
                if(products.find(e=>e.id===productId)){
                    let index = products.findIndex(e=>e.id===productId)
                    let aux2 = products[index][prop]
                    products[index][prop]=value;
                    console.log("actualización exitosa 202,\n producto con ID:"+ productId +"\t Su propiedad:" + prop +" \t cambio:"+ aux2 + "------>" + value )
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
                return products
            }
            else{
                console.log("No existe producto con ese ID 404")
                return
            }

            
            } catch (error) {
                console.error("No existen productos")
            return
                    
            }     
        }

        else {
            console.log("Propiedad invalida 405")
            return
        }
    }

    deleteProduct =async(productId)=>{
        try {
            const data = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(data)
       
            if (products.find(e=>e.id===productId)){
                products.splice(products.findIndex(e=>e.id===productId), 1)
                console.log("Producto eliminado 202")
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
                return products
            }
            else {
                console.error("No existe producto con ese ID 404")
                return
            }
            
        } catch (error) {
            console.error(error)
            return []
        }
        
        
    }


    
}

