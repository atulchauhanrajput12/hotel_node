const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
    const data = req.body;
    const newPerson = new Person(data);
    // Save the new person to the database using await
    const response = await newPerson.save();
    console.log('Saved person to database');
    res.status(201).json(response);                             //post type data
    } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });
  

router.get('/', async (req, res) => {
        try {
            const data = await Person.find(); 
            console.log('data fetched');
            res.status(200).json(data);
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});             //get type data
        }
    })


router.get('/:workType', async (req, res) => {
        try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work Type'});         //parametarized type data 
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL parameter
        const updatedPersonData = req.body; //Updated data from the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true, //Run Mongoose Validation
        })

        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated successfully');
        res.status(200).json(response);
        // res.json(response);
    }catch(error){
        console.error('Error updating person: ',error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        
        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId); 
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//git magic check

module.exports = router;