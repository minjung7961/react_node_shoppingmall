const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/product');

const getConnection = require('../lib/mariaDB');
const exec_sql = require('../lib/exec_sql');
const {getAcolProduct,getAcolDetails} = require('./sql')
//=================================
//             Product
//=================================


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const upload = multer({ storage: storage }).single("file");

router.post('/image', (req, res) => {
  // 가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
    if(err){
      return req.json({ success: false, err })
    }
      return res.json({ 
      success: true, 
      filePath: res.req.file.path, 
      fileName: res.req.file.filename 
    });
  });
});

router.post('/', (req, res) => {
  // 받아온 정보들을 db에 넣어 준다.
  const product = new Product(req.body);
  product.save((err) => {
    if(err) return res.status(400).json({success: false, err })
      return res.status(200).json({ success: true })
  });
});

router.post('/products', (req, res) => {

  let limit = req.body.limit ? parseInt(req.body.limit) :  20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm
  let findArgs = {};

  for(let key in req.body.filters){
    if(req.body.filters[key].length > 0){

      console.log('key : ', key);
      if(key === "price"){
        findArgs[key] = {
          $gte: req.body.filters[key][0], // greater then equal 크거나 같고
          $lte: req.body.filters[key][1]// 작거나 같은
        }
      }else{
        findArgs[key] = req.body.filters[key];
      }
      console.log('filters[key] : ', findArgs[key])
    }
  }

  if(term){
    // product collection에 들어 있는 모든 상품 정보를 가져오기
    Product.find(findArgs)
    .find({ $text: {$search: term}})
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({seccess: false, err })
      return res.status(200).json({ 
        success: true, 
        productInfo, 
        postSize:productInfo.length 
      })
    })
    
  }else{
    // product collection에 들어 있는 모든 상품 정보를 가져오기
    Product.find(findArgs)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({seccess: false, err })
      return res.status(200).json({ 
        success: true, 
        productInfo, 
        postSize:productInfo.length 
      })
    })
  }

  
});

router.post('/alcolProducts', (req, res) => {
  const filters = req.body.filters.alcolCG4
  console.log(filters);
  getConnection((conn) => {
    (async() => {
      try {
        // let sql = getAcolProduct;

        const sql = 
          "SELECT \n"+
          "	productid, \n"+
          "	productnm, \n"+
          "	category4cd, \n"+
          "	imgsrc, \n"+
          "	regprice, \n"+
          "	statuscd \n"+
          "FROM biz_product_info \n"+
          "WHERE category4cd LIKE '0123020%' \n"+
          " AND category4cd IN ( \n"+
          " '01230201', \n"+
          // " '01230202', \n"+
          // " '01230203', \n"+
          // " '01230204', \n"+
          // " '01230205', \n"+
          // " '01230206', \n"+
          // " '01230207', \n"+
          // " '01230208', \n"+
          " '' \n"+
          ") \n"+
          "AND statuscd = 'Y' \n"+
          "";
        
        if(filters){
          console.log('필터있다')
        }else{
          console.log('필터없다')
        }
        console.log(sql)
        let results = await exec_sql(conn, sql);
        res.send({
          success: true,
          data: results
        });
      } catch(err){
      } finally{
        conn.release();
      }
    })();
  })
});

router.get('/products_by_id', (req, res) => {

  let type = req.query.type;
  let productIds = req.query.id;

  if(type === "array"){
    
    // id = 123,456,789 를 -> productIds = ['123','456','789'] 이런식으로 바꿔주기

    let ids = req.query.id.split(',');
    productIds = ids.map(item => {
      return item
    })
  }
  // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.

  Product.find({_id: {$in: productIds}})
    .populate('writer')
    .exec((err, product) => {
      if(err) return res.status(400).send(err)
      return res.status(200).send(product)
    })
});

router.get('/alc_products_by_id', (req, res) => {
  getConnection((conn) => {
    (async() => {
      let productId = req.query.id;
      try {
        let sql = getAcolDetails;
        let results = await exec_sql(conn, sql,[productId]);
        console.log(results)
        res.send({
          success: true,
          data: results
        });
      } catch(err){
        console.log(err)
      } finally{
        conn.release();
      }
    })();
  })
});



module.exports = router;
