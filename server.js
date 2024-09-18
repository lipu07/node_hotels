// function add(a,b){
//     return a+b;
// }

// const { json, json } = require("express")

// let add= (a, b)=>  a+b;

// let result= add(5,4);

// console.log(result)

// function lipu(){
//     console.log('lipu');
// };
// lipu()

// function callback(){
//     console.log('adding is successful');
// }
// function add(a,b,callback){
//     callback();
//     console.log(a+b)   
// }
// add(4,2,callback)

// function add(a,b, callback){
//     console.log(a+b);
//     callback();
// }
// add(5,4, ()=> console.log("adding is successful"))


// var fs= require('fs')
// var os= require('os')

// var user= os.userInfo()
// console.log(user.username)


// fs.appendFile('greeting2.txt', 'hii, '+ user.username, ()=> console.log('file is created'))


// let notes= require("./notes.js")
// var _ = require('lodash');
// console.log("server file is available");
// let age= notes.age;

// let result= notes.addnumber(age,18);

// console.log(age)
// console.log(result);

// let arr=['age', 'person', 1,2,3,4,'age','person',3,4];

// let result2= _.uniq(arr)
// console.log(result2)


// const strinToConvert= {
//     name: "john",
//     age: 30,
// }
// const json= JSON.stringify(strinToConvert)
// console.log(json);
// console.log(typeof json);


// Express JS
const express = require('express')
const app = express()
const db= require("./db")
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bodyParser= require('body-parser')
app.use(bodyParser.json());

const Person= require('./models/person')
const menuItem= require('./models/menuItem')

// MiddleWare function
// const logRequest= (req, res, next)=>{
//   console.log(`${(new Date().toLocaleDateString)} Request Made to: ${req.originalUrl}`);
//   next();
// }


app.get('/', function (req, res) {
  res.send('Welcome to my Hotel')
})



const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, ()=>{
    console.log("server is live on port 3000")
})