import  express from "express";

import {DB,DBSave} from "../DB.js";

export const booksRouter = express.Router();

booksRouter.get('/',(req,res)=>{
    res.json(DB.books);
})

booksRouter.get("/:bookId",(req,res)=>{
    const {bookId} = req.params;
    res.json(DB.books.find(book => book.id == bookId));
})

booksRouter.post("/",(req,res)=>{
    const {bookname,author,price,quantity} = req.body;
    DB.books.push({id:DB.books.length + 1,bookname,author,price,quantity});
    DBSave();
    res.json(DB.books[DB.books.length - 1]);
})

booksRouter.delete("/:bookId",(req,res)=>{
    const {bookId} = req.params;
    let found = false;
    let ind = -1;
    for(let i =0;i<DB.books.length;i++){
        if(found){
            DB.books[i].id -= 1; 
        }else if(DB.books[i].id == Number(bookId)){
            found = true;
            ind = i;
        }
    }
    DB.books.splice(ind,1);
    res.json({message:"Book deleted successfully"});
})

booksRouter.put('/:bookId',(req,res)=>{
    const {bookId} = req.params;
    const {bookname,author,price,quantity} = req.body;
    for(let i =0;i<DB.books.length;i++){
        if(DB.books[i].id == Number(bookId)){
            DB.books[i].bookname = bookname;
            DB.books[i].author = author;
            DB.books[i].price = price;
            DB.books[i].quantity = quantity;
            res.json(DB.books[i]);
            break;
        }
    }
})

