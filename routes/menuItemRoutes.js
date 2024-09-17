const express= require('express');
const router= express.Router();
const menuItems = require('../models/menuItem');

router.post('/', async (req, res)=>{
    try{
      const data= req.body
      const newItem= new menuItems(data)
      const savedItem= await newItem.save()
      console.log("Data saved", savedItem);
      res.status(200).json(savedItem);
      
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'})
    }
    
})

router.get('/', async (req, res)=>{
    try{
      const data= await menuItems.find()
      console.log("Data fetched");
      res.status(200).json(data);
    }catch(err){
      console.log({err: 'internal server error'});
      res.status(500).json(err);
    }
})

router.get('/:taste', async (req, res)=>{
  try{
    const tasteType= req.params.taste;
    if(tasteType == "sweet" || tasteType== "spicy" || tasteType=="sour"){
      const response = await menuItems.find({taste: tasteType});
      console.log("Response fetched");
      res.status(200).json(response);
    }else{
      res.status(404).json({err: "Invalid taste type"});
    }
  }catch(err){
    console.log({err: 'Internal server error'});
    res.status(500).json(err);
  }
})

module.exports = router; 