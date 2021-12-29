const express=require("express");
const router= express.Router();
const User=require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const{loginRules,registerRules,validation}=require("../midelw/validator")


// register
router.post("/register",registerRules(),validation, async(req,res)=>{
    const { name ,lastName, email, passWord} = req.body;
    try {
        const newUser= new User({ name, lastName,email,passWord });
       const searchedUser = await User.findOne({email});
if(searchedUser){
    return res.status(400).send({msg: "email already exist"});
}



      const salt=10;
       const genSalt= await bcrypt.genSalt(salt);
       const hashedPassWord= await bcrypt.hash(passWord,genSalt);
       console.log(hashedPassWord) 
       newUser.passWord = hashedPassWord;
       // generate a token 
       const newUserToken =   await newUser.save();
       const payload={
        _id:newUserToken._id,
    name: newUserToken.name,
     };
      
       const token = await jwt.sign(payload, process.env.SecretOrkey,{
           expiresIn : 3600, });
       
       
       
       
       
    
     
       
       
       res.status(200).send({newUserToken, msg :"user is saved",token : `bearer ${token}`})
        //save the user
    } catch (error) {
      
        res.status(500).send("can not save user");
        console.log(error)
    }
});
//login 
router.post("/login",loginRules(),validation, async(req,res) => {

    const {email,passWord}=req.body;
try {
    const searchchedUser= await User.findOne({email});
  if(!searchchedUser){
      return res.status(400).send({msg:"bad credential"})

  }
    const match=await bcrypt.compare(passWord,searchchedUser.passWord);
    if(!match){
        return res.status(400).send({msg : "bad credential"});
    }
// cree un token 
const payload ={
    _id: searchchedUser._id,
  name: searchchedUser.name,
};
const token =await jwt.sign(payload,process.env.SecretOrkey,{
    expiresIn : 3600, });



    res.status(200).send({user:searchchedUser,msg: "ok",token: `bearer ${token}`});

} catch (error) {
   console.log(error)
    res.status(500).send({msg:"can not get the user"});

}
});


router.get("/current",)

module.exports = router ;