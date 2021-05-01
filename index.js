const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const uri = "mongodb+srv://rabeya:rabeya123@raufuprezensinc.hztjo.mongodb.net/rabeya-food-fitness?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
  const foodsCollection = client.db("rabeya-food-fitness").collection("foods");
  const reviewsCollection = client.db("rabeya-food-fitness").collection("reviews");
  const adminsCollection = client.db("rabeya-food-fitness").collection("admins");

  app.post("/addFoods", (req, res) => {
    const food = req.body;
    foodsCollection.insertOne(food)
      .then(result => {
        res.redirect('/')
      })
  })

  app.get('/foods', (req, res) => {
    foodsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.post("/addReview", (req, res) => {
    const review = req.body;
    reviewsCollection.insertOne(review)
      .then(result => {
        res.redirect('/')
      })
  })

  app.get('/reviews', (req, res) => {
    reviewsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.delete('/delete/:id', (req, res) => {
    foodsCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })

  app.post("/addAdmin", (req, res) => {
    const review = req.body;
    adminsCollection.insertOne(review)
      .then(result => {
        res.redirect('/')
      })
  })

  app.get('/admins', (req, res) => {
    adminsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  app.get('/foods/:id', (req, res) => {
    foodsCollection.find({ _id: ObjectId(req.params, id) })
      .toArray((err, documents) => {
        res.send(documents[0])
      })
  })

});

app.listen(process.env.PORT || port);