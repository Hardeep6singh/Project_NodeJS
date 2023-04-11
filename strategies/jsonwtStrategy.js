const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Sale = require('./../models/sale')
require('dotenv').config()
//getting secret key

const key = process.env.secret

var opts={}

opts.jwtFromRequest = ExtractJwt.fromBodyField('token')

opts.secretOrKey = key

module.exports = (passport)=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
     
        Sale.findById(jwt_payload.id)
        .then((sale)=>
        {
            if(sale){
                return done(null,sale)
            }
            else{
                return done(null,false)
            }
        }
        )
        .catch(err=>console.log(err))
    })
    )
}