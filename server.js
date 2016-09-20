//  need to create an authentication system that checks against the database before allowing people to mess with the system

//  RMA properties: ID (int), date (of RMA ticket creation?) (date), type (text), customer (text), drop ship (checkbox), write touch pos???, 

//      inventory: item number (int), vendor (text), serial number (int), purchase date (date), RMA type (subfields are textfields) [doa - cross ship, doa - repair & return, non-warranty - repair & return, other - see notes, return - credit, warranty - cross ship, warranty - repair & return], invoice (int), problem (textbox)
//      customer: NO INFORMATION ON THIS TAB
//      status: rma status (subfields) [item number (int), received (date). tracking # (int), eval (checkbox), stock (checkbox), clos? (checkbox)]
//      other: started by (text?), notes (textbox), hold status (subfields) [item number (int), repair hold (checkbox), hold date (date), vender RMA (int?)]

//  side bar: request, issue, receive, cancel, >|



//  I should switch this to HTTPS
var http = require('http');



var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//  this needs to be a reference to the database handle
//      something that you can pass as a variable to receive an object that will get put into the DB
var COMMENTS_FILE = path.join(__dirname, 'comments.json');


//  this is used for the comments.json file, which is obsolete
//      gonna use this to serve other static resources though
app.use('/resources', express.static(path.join(__dirname, 'public')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// middleware which sets headers.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching because the server is getting hit for updated results
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(function (req, res, next) {
    //  I need to add a module that deals with databases here
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient;
    const url = 'mongodb://localhost:27017/rma_tickets';
    
    let db = {};
    let collection;
    
    MongoClient.connect(url, function (err, dbhandle) {
        if (err) { console.log('unable to connect to mongodb', err) } else {
            db = dbhandle;
            collection = db.collection('tickets');
    

            //////////////////////////////////////////////////////////////////////////////
            //  only do this if db.counters doesn't have a document with _id "incrementor"
            db.counters.insert(
               {
                  _id: "incrementor",
                  seq: 0
               }
            )
            
        }
    });
    
    const getNextId = function () {
        const ret = db.counters.findAndModify(
            {
                query: { _id: 'incrementor' },
                update: {$inc: { seq: 1 } },
                new: true
            }
        );
    };
    
    req.db.close = function () {
        dbhandle.close();
    };
    
    req.db.list = function (filter) {
        //  might want to change the filter so that the client uses a syntax that's unrelated to the server's filter language
        //      or at the very least, validate the filter...
        const deferred = new Promise(function (resolve, reject) {
            resolve(collection.find(filter));
        });
        
        return deferred;
    };
    
    req.db.insert = function (ticket) {
        ticket._id = getNextId();
        collection.insert(ticket, function (err, result) {
            if (err) { console.log('error inserting ticket into db: ', err) } else { /* respond to client somehow */  }
        });
    };
    
    req.db.update = function (ticket) {
        const id = ticket._id;
        delete ticket._id;
        collection.update({ id: id }, { $set: ticket }, function () {
            if (err) { console.log('failed to update ticket: ', err) } else { /* send something back to teh client to indicate success */}
        });
    };
    
    req.db.remove = function (ticket) {
        try {
            collection.deleteOne({ id: ticket._id });
        } catch (e) {
            console.log('failed to delete ticket: ', e);
        }        
    }; 

    //  this might execute out of order because async; should probably make everything promises on the db handle creator    
    next();
});

/*
app.get('/api/list', function(req, res) {
    //  this is a call to the DB that returns (all?) tickets
    //      should take a filter or alternately return only the X most recent tickets....
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});
*/

app.post('/api/add', function(req, res) {
    //  ticket is an object with all the properties of a complete RMA ticket
    req.db.insert(req.body.ticket)
        .then(function (response) { res.end(response) });
    
};
app.post('/api/delete', function(req, res) {
    req.db.remove(req.body.ticket)
        .then(function (response) { 
            //  silently send report to admin about deletions -- best done on client side?
            //      no; if it's on the client side, the client can see it....
            res.end(response) 
        });
};
app.post('/api/modify', function(req, res) {
    req.db.update(req.body.ticket)
        .then(function (response) { res.end(response) });
};

app.get('/api/list', function (req. res) {
    req.db.find(req.query.filter)
        .then(function (response) { res.end(response) });
});

/*         
app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});
*/

var options = {};
http.createServer(app).listen(80, function() {
  console.log('Server started: http://localhost:80/);
});
