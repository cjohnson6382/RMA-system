/*
/// note that MongoDb stores date information on the _id key:
> db.penguins.find().forEach(function (doc){ d = doc._id.getTimestamp(); print(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()) })
2014-12-23 3:4:41
2014-12-23 3:4:53


/*


//  what is this thing below??? do I need to do a special search to hit my text filter? I don't think so.....

//  search using the name field's 'text' index
db.tickets.find({ $text: { $search: 'companyname' } }).toArray((err, docs) => {
  assert.equal(err, null);
  callback();
});


the front page of the site will have a search bar that controls what's displayed in the ticketlist box
  the tickets will have to be searchable by basically any field they have
  
the ticket modals are going to have autocomplete fields that will fetch data from the database

the customer/vendor databases are only searchable by name columns
  - use existing list of tickets for all db; tickets/vendors/customers will come from somewhere else and only tickets are created from here
    
step one: nodejs connects to the database
step two: middleware that get handles to each of the three different collections and put them on the request object

  all tickets are in JSON; all vendors and customers are objects { name: (vendorname) } and will become more complicated in time;

  tickets database:
    * get ticket: get ticket by ticket.id
    * create ticket: only takes a complete ticket object but then validates it and inserts it directly into the DB
    * delete ticket: deletes a ticket by ticket.id
    * update ticket: takes a partial ticket object and updates by ticket.id (which is a UNIQUE column)
    * search tickets: takes search string, return matching array (array.length < 25) of tickets to client for the ticketlist
    
  vendors and customers databases:
    * get vendors: takesa  search string that it uses to get a filtered list of vendors, which the client uses for its autocompletes
*/




//  this stuff below needs to get executed at start to make sure the server has the right defaults in the DB and load them in otherwise

const data = {
  "id": "",
  "date": "",
  "type": "",
  "customer": "",
  "dropship": "",
  "itemnumber": "",
  "vendor": "",
  "serial": "",
  "purchasedate": "",
  "invoice": "",
  "problem": "",
  "received": "",
  "tracking": "",
  "eval": "",
  "stock": "",
  "close": "",
  "startedby": "",
  "notes": "",
  "repairhold": "",
  "holddate": "",
  "vendorrma": ""
};

db.admin.insertOne({ _id: "new", data: data}, (err, data) => {
  assert.equal(err, null);
  console.log('successfully inserted the ticket template: ', data);
});


// server.js

//  npm install mongodb --save
//  mongodb --dbpath=/data

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const ticket_route = require('./routes/ticket_routes.js');



//  factor out the connect stuff so that dbconnect returns a handle; make the handle part of the middleware and also use it to check for default objects in DB
const dbconnect = (req, res, next) => {
  //  npm install mongodb --save
  //  mongodb --dbpath=/data

  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  
  const url = "mongodb://localhost:27017/rmatickets";
  MongoClient.connect(url, (err, db) => {
    try {
      assert.equal(err, null);
    } catch (e) {
      console.log(e.stack);
    }

    req.db = db;
    next();
  });
};

const createIndexes = () => {
  db.tickets.createIndex(
    { id: -1 },
    null,
    (err, res) => { console.log(res) }
  );
  db.tickets.createIndex(
    { date: -1 },
    null,
    (err, res) => { console.log(res) }
  );
  db.tickets.createIndex(
    { "$**": "text" },
    {
      name: "TextIndex",
      weights: {
        id: 10,
        date: 7,
        type: 4,
        customer: 6,
        dropship: 1,
        itemnumber: 9,
        vendor: 6,
        serial: 9,
        purchasedate: 8,
        invoice: 9,
        problem: 3,
        received: 8,
        tracking: 1,
        eval: 1,
        stock: 1,
        close: 1,
        startedby: 4,
        notes: 4,
        repairhold: 1,
        holddate: 1,
        vendorrma: 1
      }
    },
    (err, res) => { console.log(res) }
  );
};

let deferred = new Promise((resolve, reject) => {
  let db = MongoClient; // create a db connection
  resolve(app.use(dbconnect));
});

deferred.then((res) => {
  createIndexes();
  app.use('/api/tickets', ticket_route);
});





//  ticket_routes.js

dbcallback = (err, data) => {
  assert.equal(err, null);
  res.end(data);
};

app.use('./new', () => {
  req.db.admin.findOne({ _id: 'new' }, null, (err, data) => {
    assert.equal(err, null);
    req.db.admin.findOne({ _id: 'newId' }, {}, (err, id) => {
      assert.equal(null, err);
      data.id = id;
      data.date = new Date();
    });
    res.end(data);
  });
});

app.get('./search/:query', (req, res) => { req.db.tickets.find({ $text: { $search: req.params.query } }).toArray((err, docs) => {
    assert.equal(err, null);
    res.end(docs.length > 24 ? docs.slice(0, 24) : docs);
  });
});

app.post('./create', (req, res) => { req.db.tickets.insertOne(req.body.ticket, dbcallback) });
app.post('./update', (req, res) => { req.db.tickets.updateOne({ id: req.body.ticket.id }, { $set: req.body.ticket }, dbcallback) });
app.get('./delete/:ticketid', (req, res) => { req.db.tickets.deleteOne( { id: req.params.ticketid }, dbcallback) });
app.get('./get/:ticketid', (req, res) => { req.db.tickets.findOne( { id: req.params.ticketid }, null, dbcallback) });
