import express from "express";
const router = express.Router();

router.post('/foodData',(req,res) =>{

    try {
        res.send([global.food_item , global.food_Category]);
    } catch (error) {
        console.log(err.message);
        err.send("server error");

    }

})

export default router;