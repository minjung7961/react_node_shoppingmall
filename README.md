You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 상세페이지를 커스텀 보자 !! 



#### LandingPage.js

```react
/* AlcoholImageSlider import !! */
const [Product, setProducts] = useState([]); <- 여기에 상품들어있음(해당코드 참고)

const renderCards = Product.map((product, index) => { /* 똑같이 복사해서 이름만 renderALcolCards로 바꾸자 */

        return <a href={`/product/${product.productid}`}> {/*  url 변경할꺼임 */}
                        <ImageSlider images={product.images} />  
               </a> 
    }) 

{renderCards}
```



#### app.js

```react
import DetailProductPage from "./views/DetailProductPage/DetailProductPage.js";
/* 컴포넌트 추가할 거임 */
<Route exact path="/product/:productId" component={Auth(DetailProductPage, true)} />
{/*  라우터 추가할거임 */}
```



#### DetailProductPage.js -> DetailAlcoholeProductPage.js (새로복사할 예정)

```react
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
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



# 변경 후

#### LandingPage.js

```react
import AlcoholImageSlider from '../../utils/AlcoholImageSlider'; 
const [Product, setProducts] = useState([]); <- 여기에 상품들어있음(해당코드 참고)

                                                 
const renderALcolCards로 = Product.map((product, index) => { 

        return <a href={`/product/alc/${product.productid}`}> 
                        <AlcoholImageSlider images={product.images} />  
               </a> 
    }) 

{renderCards}
```



#### app.js

```react
import DetailProductPage from "./views/DetailProductPage/DetailProductPage.js";
import DetailAlcoholeProductPage from "./views/DetailAlcoholeProductPage/DetailAlcoholeProductPage.js";

<Route exact path="/product/:productId" component={Auth(DetailProductPage, true)} />
{/*  라우터 추가할거임 */}
```



#### DetailProductPage.js -> DetailAlcoholeProductPage.js (새로복사할 예정)

```react
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
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

