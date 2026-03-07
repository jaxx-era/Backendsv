const router = require('express').Router();
const Razorpay = require('razorpay');
const auth = require('../middleware/authMiddleware');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

router.post('/create-order', auth, async (req,res)=>{
    try{
        const options = {
            amount: 29900,
            currency:'INR',
            receipt:`receipt_${req.user.id}_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);
        res.json({success:true, order});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false,message:"Order creation failed"});
    }
});

router.post('/webhook', (req,res)=>{
    res.status(200).send('ok');
});

module.exports = router;
