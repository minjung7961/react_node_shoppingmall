You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 상품 화면에 뿌리는 부분

LandingPage.js

```react
const [Product, setProducts] = useState([]); <- 여기에 상품들어있음(해당코드 참고)

const renderCards = Product.map((product, index) => { 

        return <Col lg={6} md={8} xs={24} key={index}> 
            <Card 
                cover={ <a href={`/product/${product._id}`}> 
                        <ImageSlider images={product.images} />  
                    </a> 
                }
            > 
                <Meta 
                    title={product.title} 
                    description={`$ ${product.price}`} 
                /> 
            </Card> 
        </Col> 
    }) 

{renderCards}
```

ImageSlider.js

```react
import React from 'react'
import { Icon, Col, Card, Row, Button, Carousel } from 'antd';

function ImageSlider( props ){
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img style={{ width: '100%', maxHeight: '150px' }} src={`http://localhost:5000/${image}`}/>
          </div>
            
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
```

# 변경 후

LandingPage.js

```react
const [ALcolProcucts, setAlcolProducts] = useState([]);  <- 여기에 상품들어있음(해당코드 참고)

const renderCards = ALcolProcucts.map((product, index) => { 

        return <Col lg={6} md={8} xs={24} key={index}> 
            <Card 
              	cover={ <a href={`/product/${product.productid}`}> 
                	<ImageSlider images={`${product.imgsrc}`} /> 
                </a> 
            	}
           	> 
                <Meta 
                    title={product.title} 
                    description={`$ ${product.price}`} 
                /> 
            </Card> 
        </Col> 
    }) 
{renderCards}
```

ImageSlider.js

```react
import React from 'react'
import { Icon, Col, Card, Row, Button, Carousel } from 'antd';

function ImageSlider( props ){
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img style={{ width: '100%', maxHeight: '150px' }} src={`저장소url/${product.imgsrc}`}/>
          </div>
            
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider
```

