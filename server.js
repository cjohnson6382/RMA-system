const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const DB_URL = "mongodb://localhost:27017/rmatickets";
const ticket_route = require('./routes/ticket_routes.js');
const autocompletes_route = require('./routes/autocompletes.js');

app.use('/', express.static(path.join(__dirname, 'app')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const insertdefaults = (db) => {
  db.collection('bureaucracy').findOne({ _id: "new" })
 		.then((data) => {
			assert.equal(data, null);

		  const ticket_template = {
		    "id": "",
		    "date": "",
		    "type": "",
		    "customer": "",
		    "dropship": false,
		    "itemnumber": "",
		    "vendor": "",
		    "serial": "",
		    "purchasedate": "",
		    "invoice": "",
		    "problem": "",
		    "received": false,
		    "tracking": "",
		    "eval": false,
		    "stock": false,
		    "close": false,
		    "startedby": "",
		    "notes": "",
		    "repairhold": "",
		    "holddate": "",
		    "vendorrma": ""
		  };

	   	deferred = new Promise.all([
	   	  db.collection('bureaucracy').insertOne({ _id: "idincrementor", value: 1 }),
	   	  db.collection('bureaucracy').insertOne({ _id: "new", data: ticket_template})
	   	]);

			deferred.then((values) => {
				return values;
			});
		}) 
		.then((values) => {
    	console.log('defaults have been added to DB: ', values);
      return ticket_template;
	  })
		.catch((err) => {
			console.log('defaults are already in db');
		});
};

const createIndexes = (db) => {
  db.collection('tickets').createIndex(
    { id: -1 },
    null,
    (err, res) => { console.log(res) }
  );
  db.collection('tickets').createIndex(
    { date: -1 },
    null,
    (err, res) => { console.log(res) }
  );
  db.collection('tickets').createIndex(
    { "$**": "text" },
    {
      name: "TextIndex",
      weights: {
        id: 10,
        type: 4,
        customer: 6,
        itemnumber: 9,
        vendor: 6,
        serial: 9,
        invoice: 9,
        problem: 3,
        received: 8,
        startedby: 4,
        notes: 4,
      }
    },
    (err, res) => { console.log(res) }
  );
};

MongoClient.connect(DB_URL)
	.then((db) => {
		insertdefaults(db);
		createIndexes(db);
		app.use((req, res, next) => {
			req.db = db;
			next();
		});
		app.use('/api/tickets', ticket_route);
		app.use('/data', autocompletes_route);
		return;
	})
	.then(() => {
		http.createServer(app).listen(80, function() {
		  console.log('Server started: http://localhost:80/');
		});
	})
	.catch((err) => {
		console.log(err.stack);
	});
