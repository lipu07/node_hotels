const express= require('express');
const router= express.Router();
const Person= require('./../models/person');

router.post('/', async (req, res)=>{

    try{
      const data= req.body
    
      const newPerson= new Person(data)
      const savedPerson= await newPerson.save()
      console.log("Data saved", savedPerson);
      res.status(200).json(savedPerson);
    
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'})
    }
    
})

router.get('/', async (req, res)=>{
    try{
      const data= await Person.find()
      console.log("Data fetched");
      res.status(200).json(data);
    }catch(err){
      console.log({err: 'internal server error'});
      res.status(500).json(err);
    }
})


router.get('/:workType', async (req, res)=>{
    try{
      const workType= req.params.workType;
      if(workType == "manager" || workType == "waiter" || workType == "chef"){
        const response= await Person.find({work: workType});
        console.log('Response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({err: 'Invalid work type'})
      }
    }catch(err){
      console.log({err: 'Internal server error'});
      res.status(500).json(err);

    }
})

router.put('/:id', async (req, res)=>{
  try{
    const personId= req.params.id;
    const updatedPersonData= req.body;

    const response= await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,  //Return the updated data
      runValidators: true  // Run mongoose validation 
    });

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({err: 'internal server error'});
  }
})

router.delete('/:id', async (req, res)=>{
  try{
    const personId= req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    console.log("data deleted")
    res.status(200).json({message: 'Data deleted successfully'})
  }catch(err){
    console.log(err);
    res.status(500).json({err: 'Internal server error'});

  }
})


module.exports= router;