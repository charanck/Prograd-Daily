import  express from "express";

import {DB,DBSave} from "../DB.js";


export const productsRouter = express.Router();

productsRouter.get('/',(req,res)=>{
    res.json(DB.products);
})

productsRouter.get("/:productId",(req,res)=>{
    const {productId} = req.params;
    res.json(DB.products.find(product => product.id == productId));
})

productsRouter.post("/",(req,res)=>{
    const {productname,price,quantity} = req.body;
    DB.products.push({id:DB.products.length + 1,productname,price,quantity});
    DBSave();
    res.json(DB.products[DB.products.length - 1]);
})

productsRouter.delete("/:productId",(req,res)=>{
    const {productId} = req.params;
    let found = false;
    let ind = -1;
    for(let i =0;i<DB.products.length;i++){
        if(found){
            DB.products[i].id -= 1; 
        }else if(DB.products[i].id == Number(productId)){
            found = true;
            ind = i;
        }
    }
    DB.products.splice(ind,1);
    res.json({message:"product deleted successfully"});
})

productsRouter.put('/:productId',(req,res)=>{
    const {productId} = req.params;
    const {productname,price,quantity} = req.body;
    for(let i =0;i<DB.products.length;i++){
        if(DB.products[i].id == Number(productId)){
            DB.products[i].productname = productname;
            DB.products[i].price = price;
            DB.products[i].quantity = quantity;
            res.json(DB.products[i]);
            break;
        }
    }
})