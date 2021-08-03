const express=require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter=require('./routes/index')
const categoryRouter=require('./routes/category')
const productRouter=require('./routes/product')
const methodOverride = require('method-override')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()

const { connect } = require('mongodb')
const connectFunction=async()=>{
   try{
    // mongodb://localhost/bai22
       await mongoose.connect(process.env.STR_CONNECT,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
       })
       console.log('Connected Successfully')
   }
   catch(e){
        console.log(e)
        console.log('Connection Failed')
   }
}

connectFunction()
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout','layouts/layout')
app.use(express.static('public'))
app.use('/',indexRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)
console.log('hi')
app.listen(process.env.PORT||3000)
