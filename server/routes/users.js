const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { alcolAuth } = require("../middleware/alcolAuth");
const { Product } = require('../models/product');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.get("/alcolAuth", alcolAuth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        cart: req.user.cart,
        alcolId : req.alcolUserId,
        alcolCart : req.alcolCart ? true : []
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/alcolLogin", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});


router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => { //
    // ?????? User Collection ??? ?????? ????????? ????????? ????????????
    console.log('addToCart router : ')
    console.log('req.alcolCart : ',req.alcolCart);
    User.findOne({_id: req.user._id},
        (err, userInfo) => {
            // ????????? ???????????? ???????????? ????????? ?????? ????????? ?????? ?????? ????????? ??????
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if(item.id === req.body.productId){
                    duplicate = true;
                }
            })
            // ????????? ?????? ?????????
            if(duplicate){
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id" : req.body.productId},
                    {$inc:{"cart.$.quantity" : 1} },
                    {new: true},
                    (err, userInfo) => {
                        if(err) return res.status(400).json({ success:false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            // ????????? ?????? ?????? ?????????
            else{
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    {new : true },
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success:false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            
        })

});

// router.post("/alcolAddToCart", auth, (req, res) => { 
router.post("/alcolAddToCart", (req, res) => {
    // alcolcart ??? ?????? id ????????? ?????? ??????
    console.log('alcolAddToCart router : ')
    console.log('req.alcolCart : ',req.alcolCart);
        // ?????? ?????? ?????? ???????????? -> ?????? ??????
        // ?????? ?????? ????????? ??????????????? -> id ??? ?????? 0

});

router.get('/removeFromCart', auth, (req,res) => {
    //?????? cart?????? ?????? ???????????? ??? ????????? ????????????
    
    User.findOneAndUpdate(
        { _id:req.user._id}, // ????????? ???????????? ?????? ????????? auth ?????????????????????
        {   
            // ????????? ?????? ????????? ????????? ?????????
            "$pull": 
            {"cart": { "id" : req.query.id }}
        },
        { new : true}, // ?????? ?????? ????????? ??????????????????
        (err, userInfo) => {

            console.log(userInfo)
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })


            //product collection?????? ?????? ???????????? ???????????? ????????? ????????????
            //productIds = ['1254fs'.,'5e8dsfdsf'] ?????????????????? ?????????

            Product.find({_id: {$in: array}} )
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
    


}) 



module.exports = router;
