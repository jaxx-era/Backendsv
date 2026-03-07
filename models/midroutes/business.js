const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const axios = require('axios');
const User = require('../models/User');

router.post('/add', auth, async (req,res)=>{
    try{
        const businessRes = await axios.get('https://mybusiness.googleapis.com/v4/accounts',{
            headers:{Authorization:`Bearer ${process.env.GOOGLE_BUSINESS_KEY}`}
        });
        const user = await User.findById(req.user.id);
        user.business = businessRes.data;
        await user.save();
        res.json({success:true, business:businessRes.data});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false, message:"Failed to add business"});
    }
});

module.exports = router;
