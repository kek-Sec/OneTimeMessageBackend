const express = require('express');

const router = express.Router();

const Item = require('../models/OneTimeMessage');

var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
//Routes
router.get('/', jsonParser, async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:ItemId',jsonParser, async (req, res) => {

    try {
        const item = await Item.findById(req.params.ItemId);
        res.json(item);
    }
    catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;