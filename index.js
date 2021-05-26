const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nazmulhuda:62968512ab@cluster0.0gacq.mongodb.net/organicdb?retryWrites=true&w=majority";

const app = express();


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("organicdb").collection("collection");
  console.log('db connected')
});

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello I am working');
})




app.listen(3000,()=>console.log('Listening to the port 3000'));