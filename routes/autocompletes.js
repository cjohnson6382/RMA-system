const express = require('express');
const router = express.Router();
const assert = require('assert');

router.get('/:field/:query', (req, res) => {

	console.log(req.params.query);

	let regex = new RegExp('^' + req.params.query, 'i');
	req.db.collection('tickets').distinct(req.params.field, { [req.params.field]: { $regex: regex }})
    .then((data) => {
			console.log(data);
      res.end(JSON.stringify(data.length > 15 ? docs.slice(0, 14) : data));
    })
    .catch((err) => { console.log(err.stack) });
});

module.exports = router;
