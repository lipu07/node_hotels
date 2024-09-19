const passport= require('passport');
const localStrategy= require('passport-local').Strategy;
const Person= require('./models/person')



passport.use(new localStrategy(async (username, password, done)=>{
  //Authentication logic
  try{
    //console.log("Received Credential", username, password);
    const user = Person.findOne({username: username})
  
    if(!user){
      return done(null, false, {message: "Incorrect username"});
    }

    const isPasswordMatch= user.password === password ? true: false;
    if(!isPasswordMatch){
      return done(null, false, {message: "Incoreect password"});
    }
  }catch(err){
    return done(err);
  }
}));

module.exports= passport;