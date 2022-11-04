You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

<<<<<<< HEAD
# 상세페이지를 커스텀 보자 - 4. 상세페이지 이미지

## 변경 전

#### DetailAlcoholeProductPage.js 

```react
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import ProductImage from './Sections/ProductImage'; // 다른 컴포넌트만들어서 임포트
import ProductInfo from './Sections/ProductInfo';	// 다른 컴포넌트만들어서 임포트
import {Row, Col} from 'antd'

function DetailProductPage(props){

  const productId = props.match.params.productId

  const [Product, setProduct] = useState({});
  
  useEffect(() => {
    axios.get(`/api/product/alc_products_by_id?id=${productId}&type=single`) 
    .then(response => {
        setProduct(response.data[0])
    })
    .catch(err => alert(err))
  }, [])
  
  return(
    <div style={{ width:'100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={Product}/> {/* 잠시 주석처리 */}
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo detail={Product}/> {/* 잠시 주석처리 */}
        </Col>
      </Row>
      
      
    </div>
  )
}

export default DetailProductPage
=======
<<<<<<< HEAD
# 상세페이지를 커스텀 해보자 - 서버 작업

=======
# 상세페이지를 커스텀 보자 !! 
>>>>>>> parent of 6990802 (상세페이지를 커스텀해 보자 - 2.프론트 작업)


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
>>>>>>> 768a6dd3251fe520cb992377ca72b5d5b619df38
```

## 변경후 

<<<<<<< HEAD
#### DetailAlcoholeProductPage.js
=======

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



<<<<<<< HEAD


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
=======
#### app.js

```react
import DetailProductPage from "./views/DetailProductPage/DetailProductPage.js";
import DetailAlcoholeProductPage from "./views/DetailAlcoholeProductPage/DetailAlcoholeProductPage.js";

<Route exact path="/product/:productId" component={Auth(DetailProductPage, true)} />
{/*  라우터 추가할거임 */}
```



#### DetailProductPage.js -> DetailAlcoholeProductPage.js (새로복사할 예정)
>>>>>>> 768a6dd3251fe520cb992377ca72b5d5b619df38

```react
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import ProductImage from './Sections/ProductImage'; // 다른 컴포넌트만들어서 임포트
import ProductInfo from './Sections/ProductInfo';	// 다른 컴포넌트만들어서 임포트
import {Row, Col} from 'antd'

function DetailProductPage(props){

  const productId = props.match.params.productId

  const [Product, setProduct] = useState({});
  
  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`) // url 변경
    .then(response => {
        setProduct(response.data[0])
    })
    .catch(err => alert(err))
  }, [])
>>>>>>> parent of 6990802 (상세페이지를 커스텀해 보자 - 2.프론트 작업)
  
<<<<<<< HEAD
  return(
    <div style={{ width:'100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* <ProductImage detail={Product}/>   */}
        </Col>
        <Col lg={12} sm={24}>
          {/* <ProductInfo detail={Product}/>  */}
        </Col>
      </Row>
      
      
    </div>
  )
}

export default DetailProductPage
=======
module.exports = {getAlcProductDetails};
>>>>>>> 768a6dd3251fe520cb992377ca72b5d5b619df38
```



## 추가

#### product.js (라우터)

```js
router.get('/alc_products_by_id', (req, res) => {
  getConnection((conn) => {
    (async() => {
      try {
        let sql = getAcolDetails;
        let results = await exec_sql(conn, sql);
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

```

#### sql.js

```js
const getAcolDetails = 
  "SELECT \n"+
  "	a.productid, \n"+
  "	a.productnm, \n"+
  "	a.imgsrc, \n"+
  "	a.regprice, \n"+
  "	a.weight \n"+
  "FROM biz_product_info a \n"+
  "WHERE category4cd LIKE '0123020%' \n"+
  " AND productid = '0123020100006' \n" ;
  
module.exports = {getAcolDetails};
```



