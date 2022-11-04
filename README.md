You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 상세페이지를 커스텀 보자 - 상세페이지 완료

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
           <ProductImage detail={Product}/>   
        </Col>
        <Col lg={12} sm={24}>
           <ProductInfo detail={Product}/>  
        </Col>
      </Row>
      
      
    </div>
  )
}

export default DetailProductPage
```

#### ProductImage.js

```react
import React, {useEffect, useState} from 'react'
import ReactImageGallery from 'react-image-gallery';

function ProductImage(props){

  const [Images, setImages] = useState([])

  useEffect(() => {
    if(props.detail.imgsrc){
      let images = []
        images.push({
          original: `https://cdn.aissgo1.com${props.detail.imgsrc}`,
          thumbnail : `https://cdn.aissgo1.com${props.detail.imgsrc}`
        })
      setImages(images);
    }else{
      
    }
  }, [props.detail])

  return(
    <div>
     <ReactImageGallery items={Images} />
    </div>
  )
}

export default ProductImage
```

#### productInfo.js

```react
import React from 'react'
import {Button, Descriptions} from 'antd'
import {useDispatch} from 'react-redux';//
import {addToCart} from '../../../../_actions/user_actions';//

function ProductInfo(props){

  const dispatch = useDispatch();//

  const clickHandler = () => {
    // 필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(addToCart(props.detail._id))//
  }

  return(
    <div>
      <Descriptions title="Product Info" layout="vertical" bordered>
        <Descriptions.Item label="Price">{props.detail.regprice}</Descriptions.Item>
        <Descriptions.Item label="weight">{props.detail.weight}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <div style={{ display:'flex', justifyContent: 'center' }}>
        <Button size='large' shape='round' type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>

      </div>
    </div>
  )
}

export default ProductInfo
```

#### product.js (라우터)

```js
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
  " AND productid = ? \n" ;
  
module.exports = {getAcolDetails};
```



