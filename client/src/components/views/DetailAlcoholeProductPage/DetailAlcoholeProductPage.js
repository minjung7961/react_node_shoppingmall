import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';//
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Row, Col} from 'antd'

function DetailAlcoholeProductPage(props){

  const productId = props.match.params.productId

  const [Product, setProduct] = useState({});

  let userData = {};
  useSelector(state => {
    userData = state.user.userData;
  })
  
  useEffect(() => {
    axios.get(`/api/product/alc_products_by_id?id=${productId}&type=single`)
    .then(response => {
        setProduct(response.data.data[0]);
    })
    .catch(err => alert(err))
  }, [])
  
  return(
    <div style={{ width:'100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.productnm}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={Product}/>
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo detail={Product} userData={userData}/>
        </Col>
      </Row>
    </div>
  )
}

export default DetailAlcoholeProductPage