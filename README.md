You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 주류이름검색 기능을 구현해 보자

기존 이름 검색 기능을 보고 새로운 주류 이름 검색 기능을 만들어 보자

### 기존 이름 검색 에 영향을 주는 코드

* LandingPage.js
* SearchFeature.js
* product.js (라우터)

#### LandingPage.js

```react
import React, { useEffect ,useState } from 'react'
import axios from 'axios';
import {CheckBox} from './Sections/CheckBox';
import {continents, price} from './Sections/Datas';

function LandingPage() {
    
    const [Product, setProducts] = useState([]); 
    const [Filters, setFilters] = useState({
        continents: [],
    })
    const [SearchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        
 		let body = {
            filters : Filters 
        }
        
        getProducts(body)
        
    },[])
    
    const getProducts = (body) => { 

        axios.post('/api/product/products', body) 
            .then(response => { 
            if(response.data.success){ 
                setProducts(response.data.productInfo);
            }else{ 
                alert("상품들을 가져오는데 실패 했습니다.") 
            } 
        }) 
    }
    
    const updateSearchTerm = (newSearchTerm) => {
        

        let body = {
            skip : 0,
            limit : Limit,
            filters : Filters,
            searchTerm : newSearchTerm
        }
        getProducts(body)
        setSkip(0)
        setSearchTerm(newSearchTerm);

    }
    
    return(
    
        <AlcolSearchFeature refreshFuction = {updateSearchTerm}/>
        
        {renderCards}
        
    )
        
}
```

#### SearchFeature

```react
import React, { useState } from 'react'
import { Input } from 'antd';

const {Search} = Input;

function SearchFeature(props){

  const [SearchTerm, setSearchTerm] = useState("")

  const searchHandler = (event) => {
    setSearchTerm(event.currentTarget.value)
    props.refreshFuction(event.currentTarget.value)
  }
  return(
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        style={{
          width: 200,
        }}
        value={SearchTerm}
      />
    </div>
  )
}

export default SearchFeature
```

#### product.js (라우터)

```js
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

```

#### 

###  주류 이름 검색 기능

* LandingPage.js
* AlcolSearchFeature.js
* product.js
* sql.js

#### sql.js

```js
const getAcolProduct = 
  "SELECT \n"+
  "	productid, \n"+
  "	productnm, \n"+
  "	category4cd, \n"+
  "	imgsrc, \n"+
  "	regprice, \n"+
  "	statuscd \n"+
  "FROM biz_product_info \n"+
  "WHERE category4cd LIKE '0123020%' \n"+
  "AND statuscd = 'Y' \n"+
  "";

module.exports = { getAcolProduct };
```



#### LandingPage.js

```react
import React, { useEffect ,useState } from 'react'
import axios from 'axios';
import {CheckBox} from './Sections/CheckBox';
import {continents, price} from './Sections/Datas';

function LandingPage() {
    
    const [Product, setProducts] = useState([]); 
    const [Filters, setFilters] = useState({
        continents: [],
    })
    const [ALcolSearchTerm, setALcolSearchTerm] = useState("");
    
    useEffect(() => {
        
 		let body = {
            filters : Filters 
        }
        
        getProducts(body)
        
    },[])
    
    const getProducts = (body) => { 

        axios.post('/api/product/products', body) 
            .then(response => { 
            if(response.data.success){ 
                setProducts(response.data.productInfo);
            }else{ 
                alert("상품들을 가져오는데 실패 했습니다.") 
            } 
        }) 
    }
    
    const AlcolUpdateSearchTerm = (newSearchTerm) => {
        

        let body = {
            filters : AlcolFilters,
            searchTerm : newSearchTerm
        }
        getAlcolProcuts(body)
        setALcolSearchTerm(newSearchTerm);

    }
    
    return(
    
        <AlcolSearchFeature refreshFuction = {AlcolUpdateSearchTerm}/>
        
        {renderCards}
        
    )
        
}
```

#### SearchFeature

```react
import React, { useState } from 'react'
import { Input } from 'antd';

const {Search} = Input;

function SearchFeature(props){

  const [SearchTerm, setSearchTerm] = useState("")

  const searchHandler = (event) => {
    setSearchTerm(event.currentTarget.value)
    props.refreshFuction(event.currentTarget.value)
  }
  return(
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        style={{
          width: 200,
        }}
        value={SearchTerm}
      />
    </div>
  )
}

export default SearchFeature
```

#### product.js (라우터)

```js
const express = require('express');
const router = express.Router();
const {getAcolProduct} = require('./sql')

router.post('/alcolProducts', (req, res) => {
  const filters = req.body.filters.alcolCG4
  console.log(filters);
  getConnection((conn) => {
    (async() => {
      try {

        let sql = ''
        const upperSql = 
          "SELECT \n"+
          "	productid, \n"+
          "	productnm, \n"+
          "	category4cd, \n"+
          "	imgsrc, \n"+
          "	regprice, \n"+
          "	statuscd \n"+
          "FROM biz_product_info \n"+
          "WHERE category4cd LIKE '0123020%' \n"

        const lowerSql = 
          "AND statuscd = 'Y' \n"+
          "";

        let whereSql = ''

         if(searchTerm){
          console.log('상품이름 있다.')
          whereSql += "AND productnm LIKE '%"+searchTerm+"%'";
          console.log(searchTerm)
        }
        
        sql = upperSql + whereSql  + lowerSql;
        console.log(sql);

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
```



## 추후에 할것

-
