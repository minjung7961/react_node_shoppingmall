You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 대륙 필터 코드를 보고 알콜 필터 코드를 완성해 보쟈.

### 대륙필터에 영향을 주는 코드

* LandingPage.js
* product.js

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
    
    useEffect(() => {
        
 		let body = {
            skip: Skip, // 지금안중요
            limit: Limit, // 지금안중요
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
    
    const showFilterResults = (filters) => {

        let body = {
            filters : filters
        }
        getProducts(body)
    }
    
    const handleFilters = async(filters, category) => {

        const newFilters = {...Filters}
        newFilters[category] = filters

        showFilterResults(newFilters)
        setFilters(newFilters)
    }
    
    return(
    
        <Col lg={12} xs={24}>
            <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
        </Col>
        
        {renderCards}
        
    )
        
}
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



### 술종류 필터에 영향을 주는 코드

* LandingPage.js
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
  " AND category4cd IN ( \n"+
  " '01230201', \n"+
  " '01230202', \n"+
  " '01230203', \n"+
  " '01230204', \n"+
  " '01230205', \n"+
  " '01230206', \n"+
  " '01230207', \n"+
  " '01230208', \n"+
  " '' \n"+
  ") \n"+
  "AND statuscd = 'Y' \n"+
  "";

module.exports = { getAcolProduct };
```



#### LandingPage.js

```react
import React, { useEffect ,useState } from 'react'
import axios from 'axios';
import {AlcolCheckBox} from './Sections/AlcolCheckBox';

function LandingPage() {
    
    const [alcolFilter, setAlcolFilter] = useState([]);
    const [ALcolProcucts, setAlcolProducts] = useState([]); 
    const [alcolFilters, setAlcolFilters] = useState({
        continents: [],
        price: [],
        alcolCG4: [],
    });
    
    
    useEffect(() => {
        
 		let alcolBody = {
            filters : alcolFilter 
        }
        
        getAlcolCategory()
        getAlcolProcuts(alcolBody)
        
    },[])
    
    const getAlcolProcuts = (body) => {
        axios.post('/api/product/alcolProducts',body)
            .then(response => {
                if(response.data.success){
                    if(response.data.data && response.data.success){
                        setAlcolProducts(response.data.data)
                        console.log('getAlcolProducts : ')
                        console.log(response.data.data)
                    }
                }
            })
            .catch(err => alert(err));
    }
    
    const alcolShowFilterResults = (filters) => {

        let body = {
            filters : filters
        }
        getAlcolProcuts(body)
    }
    
    const alcolHhandleFilters = async(filters, category) => {

        const newFilters = {...alcolFilters}
        newFilters[category] = filters

        alcolShowFilterResults(newFilters)
        setAlcolFilters(newFilters)
    }
    

    return(
    
       <Col lg={12} xs={24}>
        <AlcolCheckBox list={alcolFilter} handleFilters={filters => alcolHandleFilters(alcolFilter, "alcolFilters")} />
       </Col>
        
        {renderALcolCards}
        
    )
        
}
```

#### product.js (라우터)

```js
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
```

