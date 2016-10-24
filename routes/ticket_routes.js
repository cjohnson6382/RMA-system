const express = require('express');
const router = express.Router();
const assert = require('assert');

const multer = require('multer');
const upload = multer();

router.use(upload.none());

router.get('/new', (req, res) => {
  req.db.collection('bureaucracy').findOne({ _id: 'new' }) 
		.then((ticket) => {
	    return req.db.collection('bureaucracy').findOneAndUpdate(
	      { _id: 'idincrementor' },
	      { $inc: { value: 1 } }
 	   	)
 	  .then((id) => {
 	    ticket.data.id = id.value.value;
 	    ticket.data.date = new Date().valueOf();
 	    res.end(JSON.stringify(ticket.data));
 	  })
 	  .catch((err) => { console.log(err.stack) });
 	});
});

router.get('/search/:query', (req, res) => {
	let queryobj = JSON.parse(req.params.query);
	let query = queryobj.search === "" ? {} : { $text: { $search: queryobj.search } };

	console.log(queryobj);

	if (queryobj.before !== "" || queryobj.after !== "") {
		query.date = {};

		if (queryobj.before !== "") {
			let before = new Date(queryobj.before.split("-"));
			query.date['$lte'] = before.valueOf();
		}
		if (queryobj.after !== "") {
			let after = new Date(queryobj.after.split("-"));
			query.date['$gte'] = after.valueOf();
		}
	}

  req.db.collection('tickets').find(query).toArray()
    .then((docs) => {
			console.log(docs);
		
      res.end(JSON.stringify(docs.length > 24 ? docs.slice(0, 24) : docs));
    })
    .catch((err) => { console.log(err.stack) });
});

router.post('/update', (req, res) => { 
	let ticket = JSON.parse(req.body.ticket);

	console.log(ticket);

	delete ticket._id;
	req.db.collection('tickets')
		.update(
			{ id: ticket.id },
			ticket, 
			{ upsert: true }
		)
		.then((data) => {
			res.end(JSON.stringify(data.result));
		})
		.catch((err) => {
			console.log(err);
		});
});
router.get('/delete/:ticketid', (req, res) => { 
	console.log(req.params.ticketid);
	req.db.collection('tickets').deleteOne({ id: parseInt(req.params.ticketid) })
		.then((data) => {
			console.log('delete returned');
			res.end(JSON.stringify(data.toString()));
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/get/:ticketid', (req, res) => { 
	let ticketid = req.params.ticketid;
	//	console.log(parseInt(ticketid));
	
	req.db.collection('tickets').findOne({ id: parseInt(req.params.ticketid) })
		.then((data) => {
			res.end(JSON.stringify(data));
		})
		.catch((err) => {
			console.log('catching errors: ', err);
		});
});

module.exports = router;
