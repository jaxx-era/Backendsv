const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const axios = require('axios');
const { getNextGeminiKey } = require('../middleware/apiKeyRotation');

router.get('/run', auth, async (req,res)=>{
    try{
        const key = getNextGeminiKey();
        const response = await axios.post('https://gemini.googleapis.com/analyze',{
            businessId: req.user.business?.accounts?.[0]?.name
        },{
            headers:{Authorization:`Bearer ${key}`}
        });
        res.json({success:true,result:response.data});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false,message:"Gemini analysis failed"});
    }
});

module.exports = router;
