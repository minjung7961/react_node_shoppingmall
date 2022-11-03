You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 상세페이지를 커스텀 해보자 - 서버 작업



## 변경 전

#### product.js(라우터)

```react
const express = require('express');
const router = express.Router();
const getConnection = require('../lib/mariaDB');
const {getAcolProduct} = require('./sql')

router.get('/alc_products_by_id', (req, res) => { // 똑같은 라우터 복사하고 url을 바꾼다.
  getConnection((conn) => {
    (async() => {
      try {
        let sql = getAcolProduct;
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


module.exports = router;
```





#### sql.js

```react
const getAcolProduct = //바꾼다음 해당 필드에서 이미지와 이름 가격만 가져온다.
  "SELECT \n"+
  "	productid, \n"+
  "	productnm, \n"+
  "	category4cd, \n"+
  "	imgsrc, \n"+
  "	regprice, \n"+
  "	statuscd \n"+
  "FROM biz_product_info \n"+
  "WHERE category4cd LIKE '0123020%' \n";
  
module.exports = {getCG4,getAcolProduct};
```



## 변경 후

#### product.js(라우터)

```react
const express = require('express');
const router = express.Router();
const getConnection = require('../lib/mariaDB');
const {getAlcProductDetails} = require('./sql')

router.get('/alc_products_by_id', (req, res) => { // 똑같은 라우터 복사하고 url을 바꾼다.
  getConnection((conn) => {
    (async() => {
      try {
        let sql = getAlcProductDetails;
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


module.exports = router;
```





#### sql.js

```react
const getAlcProductDetails = 
  "SELECT \n"+
  " a.productid, \n"+
  " a.productnm, \n"+
  " a.imgsrc, \n"+
  " a.regprice, \n"+
  " a.weight \n"+
  "FROM biz_product_info a \n"+
  "WHERE category4cd LIKE '0123020%' \n"+
  " AND productid = '0123020100006' \n"+
  " \n";
  
module.exports = {getAlcProductDetails};
```

