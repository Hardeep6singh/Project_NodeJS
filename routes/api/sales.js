const express = require('express')
const router = express.Router()
const { celebrate, Joi, errors, Segments } = require('celebrate');
const bcrypt = require('bcrypt')
const Jsonwt = require('jsonwebtoken')
const passport = require('passport')

const Sale = require('./../../models/sale')


router.get('/',(req,res)=>{

     
    //route where user will enter the JWt token in form
    res.render('jwt_valid')
})

router.post('/form',passport.authenticate('jwt',{session:false}), //middleware from passport-jwt
    async(req,res)=>{
    res.render('form');
})

router.post('/data',(req,res)=>{
      const page = req.body.page;
      const perPage = req.body.perpage;
      const storeLocation = req.body.location;
      let   skip = req.body.skip;
    // calculate the skip value for pagination
    skip = (page - 1) * perPage
    
     Sale.find({'storeLocation': storeLocation}).skip(skip).limit(perPage)
        .then(sale =>
             {
                if (sale) {  
               /*     res.render('data',
                {
                title:'Json data',
                data:sale
                })*/
                  res.status(200).send(sale)
                } else {
                  res.status(404).send("Not Found.")
                }
            })
        .catch(err => res.send(err))
})



// create a new document. URL : /api/sales/
router.post('/', (req, res) => {

    const saleData = req.body;
    const sale = new Sale(saleData);

    sale
        .save()
        .then(() => { res.status(201).send('Add Success') })
        .catch((err) => res.status(500).send(err.message))

})

router.get('/', celebrate({
    [Segments.QUERY]: {
        page: Joi.number().integer().required(),
        perPage: Joi.number().integer().required(),
        storeLocation: Joi.string()
    }
}), (req, res) => {
    const page = req.query.page
    const perPage = req.query.perPage

    // calculate the skip value for pagination
    const skip = (page - 1) * perPage

    // build the query based on the storeLocation parameter, if provided
    const storeLocation = req.query.storeLocation ? { storeLocation: req.query.storeLocation } : {}

    Sale.find(storeLocation).skip(skip).limit(perPage).then(sale => {
        if (sale) {
            res.status(200).send(sale)
        } else {
            res.status(404).send("Not Found.")
        }
    })
        .catch(err => res.send(err))
})

router.use(errors());


// Get a document using _id URL : /api/sales/:_id
router.get('/:id', (req, res) => {

    Sale
        .findOne({ _id: req.params.id })
        .then(sale => {
            if (sale) {
                res.status(200).send(sale)
            } else {
                res.status(404).send("Not Found.")
            }
        })
        .catch(err => res.send(err))

})

// Update a document using _id URL : /api/sales/:_id
router.put('/:id', (req, res) => {
    const updates = req.body;

    Sale
        .updateOne(
            { _id: req.params.id },
            { $set: updates })
        .exec()
        .then(() => { res.status(201).send('Sales Document Updated!') })
        .catch(err => res.status(500).send(err.message))

})

// Delete a document using _id URL : /api/sales/:_id
router.delete('/:id', (req, res) => {

    Sale
        .deleteOne({ _id: req.params.id })
        .exec()
        .then(() => { res.status(201).send('Sale Document Deleted!') })
        .catch(err => res.status(500).send(err.message))

})

module.exports = router