const router = require('express').Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/google', (req,res)=>{
    const redirect_uri = encodeURIComponent(process.env.GOOGLE_REDIRECT_URI);
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=openid email profile`;
    res.redirect(url);
});

router.get('/google/callback', async (req,res)=>{
    const code = req.query.code;
    try{
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token',{
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type:'authorization_code'
        });

        const {id_token} = tokenRes.data;
        const payloadJSON = JSON.parse(Buffer.from(id_token.split('.')[1],'base64').toString());
        const email = payloadJSON.email;

        let user = await User.findOne({email});
        if(!user){
            user = new User({email, googleId: payloadJSON.sub});
            await user.save();
        }

        const token = jwt.sign({id:user._id,email:user.email}, process.env.JWT_SECRET,{expiresIn:'7d'});
        res.json({success:true, token, user});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false, message:"Google login failed"});
    }
});

module.exports = router;
