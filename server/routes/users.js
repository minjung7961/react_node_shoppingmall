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
    // 먼저 User Collection 에 해당 유저의 정보를 가져오기
    console.log('addToCart router : ')
    console.log('req.alcolCart : ',req.alcolCart);
    User.findOne({_id: req.user._id},
        (err, userInfo) => {
            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if(item.id === req.body.productId){
                    duplicate = true;
                }
            })
            // 상품이 이미 있을때
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
            // 상품이 이미 있지 않을때
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
    // alcolcart 에 물건 id 정보와 갯수 증가
    console.log('alcolAddToCart router : ')
    console.log('req.alcolCart : ',req.alcolCart);
        // 이미 있던 물건 이었다면 -> 갯수 증가
        // 이미 있던 물건이 아니었다면 -> id 와 갯수 0

});

router.get('/removeFromCart', auth, (req,res) => {
    //먼저 cart안에 내가 지우려고 한 상품을 지워주기
    
    User.findOneAndUpdate(
        { _id:req.user._id}, // 이렇게 가져올수 있는 이유는 auth 미들웨어때문임
        {   
            // 아래와 같은 정보를 뺴라는 명령어
            "$pull": 
            {"cart": { "id" : req.query.id }}
        },
        { new : true}, // 위의 바뀐 정보를 업데이트하라
        (err, userInfo) => {

            console.log(userInfo)
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })


            //product collection에서 현재 남아있는 상품들의 정보를 가져오기
            //productIds = ['1254fs'.,'5e8dsfdsf'] 배열형식으로 바꾸기

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
