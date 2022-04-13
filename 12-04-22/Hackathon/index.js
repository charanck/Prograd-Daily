import express from 'express';
import fetch from 'node-fetch';
import {initDB,Stock} from './models.js';
import {getShareData} from './scrapper.js';

const app = express();

app.use(initDB);
app.use(express.json());

app.get('/:stockSymbol',async( req,res)=>{
    let stockDetails;
    const stock = await Stock.findOne({stockSymbol:req.params.stockSymbol});
    if(stock){
        res.json(stock);
    }else{
        stockDetails= await getShareData(req.params.stockSymbol);
        const newStock = new Stock({stockSymbol:req.params.stockSymbol,value:stockDetails});
        await newStock.save();
        res.json(stockDetails);
    } 
});

app.get('/search/:searchText',async (req,res)=>{
    const result = await (await fetch(`https://www.screener.in/api/company/search/?q=${req.params.searchText}&v=2`)).json();
    res.json(result);
});


app.listen(3000,()=>console.log('Listening...'))