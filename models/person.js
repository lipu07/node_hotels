const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const passport = require('passport');

const personSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
})

personSchema.pre('save', async function(next) {
    const person = this;
    if(person.isModified('password')) return next();
    try{
        const salt= await bcrypt.genSalt(10);

        const hashedPassword= await bcrypt.hash(person.password, salt);
        
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    } 
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatched= await bcrypt.compare(candidatePassword, this.password);
        return isMatched;
    }catch(err){
        throw err;
    }
}

const person= mongoose.model('person', personSchema)
module.exports= person;