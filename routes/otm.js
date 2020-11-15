const express = require('express');
var moment = require('moment'); // require

const router = express.Router();

const Item = require('../models/OneTimeMessage');

var bodyParser = require('body-parser');
const OneTimeMessage = require('../models/OneTimeMessage');

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

router.post('/add',jsonParser, (req, res) => {

    const message = new OneTimeMessage({
        message_title: req.body.message_title,
        message_body: req.body.message_body,
        expireAt: moment().add(10, 'seconds')
    });
      message
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Handling POST requests to /otm/add",
            createdProduct: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });

});

module.exports = router;