const express = require('express');
var moment = require('moment'); // require
var btoa = require('btoa');
var atob = require('atob');

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

        //req.params.ItemId = atob(req.params.ItemId);
        try {
        const item = await Item.findById(atob(req.params.ItemId));
        res.json(item);
        if (item.message_burn_on_read)
        {
            item.remove({_id: atob(req.params.ItemId)});
        }
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.post('/add',jsonParser, (req, res) => {

    var expiry = setExpiry(req);
    const message = new OneTimeMessage({
        message_title: req.body.message_title,
        message_body: req.body.message_body,
        message_burn_on_read: req.body.message_burn_on_read,
        expireAt: expiry
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

function setExpiry(req)
{
    try{
        if(req.body.message_expires === "1 Week")
        {
            return moment().add(604800, 'seconds');
        }
        else if(req.body.message_expires === "1 Month")
        {
            return moment().add(30, 'days'); 
        }
        else if(req.body.message_expires === "1 Day")
        {
            return moment().add(24,'hours');
        }
        else if(req.body.message_expires === "Never")
        {
            return moment.add(24,"months");
        }
        else
        {
            return moment().add(12,"months");
        }
    }
    catch(exception)
    {
        console.log(exception);
    }
}

module.exports = router;
