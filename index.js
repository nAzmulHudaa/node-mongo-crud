const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nazmulhuda:62968512ab@cluster0.0gacq.mongodb.net/organicdb?retryWrites=true&w=majority";
const ObjectId = require('mongodb').ObjectID;

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("organicdb").collection("collection");

  app.get('/products',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
  



  app.post("/addProduct",(req,res)=>{
    const product = req.body;
    collection.insertOne(product)
    .then(result=>{
      console.log('Data added successfully');
      res.send('success');
    })
  })


  app.delete('/delete/:id',(req,res)=>{
    collection.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
      console.log(result);
    })
  })


  app.get('/product/:id',(req,res)=>{
    collection.find({_id:ObjectId(req.params.id)})
    .toArray((err,documents)=>{
      res.send(documents[0])
    })
  })

  app.patch('/update/:id',(req,res)=>{
    collection.updateOne({_id:ObjectId(req.params.id)},
      {
        $set : {price : req.body.price, quantity:req.body.quantity}
      }
    )
    .then(result =>{
      console.log(result);
    })
  })
});



app.listen(3000,()=>console.log('Listening to the port 3000'));