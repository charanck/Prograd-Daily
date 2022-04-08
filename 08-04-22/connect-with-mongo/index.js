const express = require("express");
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;


const MONGOURI = `mongodb+srv://admin:admin@cluster0.obmxw.mongodb.net/Cluster0?retryWrites=true&w=majority`;

function getDb(){
    return new Promise((resolve,reject)=>{
        MongoClient.connect(MONGOURI, function(err, db) {
            if (err) reject(err);
            resolve(db);
        });
    });
}

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
    const dbConnection = await getDb();
    const db = dbConnection.db('Cluster0');
    const data = await db.collection("User").find().toArray();
    res.json(data);
    dbConnection.close()
});

app.post('/users',async (req,res)=>{
    const dbConnection = await getDb();
    const db = dbConnection.db('Cluster0');
    try{
        await db.collection('User').insertOne(req.body);
        res.json({'message':'user added successfully'});
    }catch(err){
        res.json(err);
    }finally{
        dbConnection.close();
    }
});

app.get('/users/:userId',async (req,res)=>{
    const {userId} = req.params;
    const dbConnection = await getDb();
    const db = dbConnection.db('Cluster0');

    try{
        const data = await db.collection('User').find({'_id':new mongodb.ObjectId(userId)}).toArray();
        res.json(data[0]);
    }catch(err){
        res.json(err);
    }finally{
        dbConnection.close();
    }
});

app.put('/users/:userId',async (req,res)=>{
    const {userId} = req.params;
    const user = req.body;
    const dbConnection = await getDb();
    const db = dbConnection.db('Cluster0');

    try{
        await db.collection('User').updateOne({'_id':new mongodb.ObjectId(userId)},{$set:{name:user.name,age:user.age}});
        res.json({message:'user update successfully'});
    }catch(err){
        res.json(err);
    }finally{
        dbConnection.close();
    }
});

app.delete('/users/:userId',async (req,res)=>{
    const {userId} = req.params;
    const dbConnection = await getDb();
    const db = dbConnection.db('Cluster0');

    try{
        await db.collection('User').deleteOne({'_id':new mongodb.ObjectId(userId)});
        res.json({message:'user deleted successfully'});
    }catch(err){
        res.json(err);
    }finally{
        dbConnection.close();
    }
});

app.listen("3000", () => console.log("Listening...."));
