You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 가격 선택 구현

검색 항목

* 0~2만원
* 2~4만원
* 4~6만원
* 6~8만원
* 8만원이상



술종류 필터를 참고하여 가격 선택 필터도 구현하자.



### 술종류 필터에 영향을 주는 코드

* LandingPage.js
* product.js

#### LandingPage

```react
import React, { useEffect ,useState } from 'react'
import axios from 'axios';
import {AlcolCheckBox} from './Sections/AlcolCheckBox';

function LandingPage() {
    
    const [alcolFilter, setAlcolFilter] = useState([]);
    const [ALcolProcucts, setAlcolProducts] = useState([]); 
    const [AlcolFilters, setAlcolFilters] = useState({
    	continents: [],
        price: [],
        alcolCG4: [],
    });
    
    useEffect(() => {
        
 		let alcolBody = {
            filters : AlcolFilters 
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
    
        <AlcolCheckBox list={alcolFilter} handleFilters={filters => alcolHandleFilters(alcolFilter, "alcolFilters")} />
        
        {renderALcolCards}
        
    )
        
}
```

#### AlcolCheckBox.js

```react
import React, {useState}from "react"
import {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

function AlcolCheckBox(props){

  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {

    const currentIndex = Checked.indexOf(value)
    const newChecked = [...Checked]

    if(currentIndex === -1){
      newChecked.push(value)
    }else{
      newChecked.splice(currentIndex,1)
    }
    
    setChecked(newChecked)
    props.handleFilters(newChecked)
  }
  
  const renderCheckboxList = () => {
    return props.list.map((value,index) => (
            <React.Fragment key={index}>
              <Checkbox onChange = {() => handleToggle(value._id)} 
                checked={Checked.indexOf(value._id) === -1 ? false : true}/>{value.name}
            </React.Fragment>
          ))
}

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header={props.header} key="0">       
          {renderCheckboxList()}
        </Panel>
        
      </Collapse>
    </div>
  )
}

export {AlcolCheckBox}
```



#### product.js (라우터)

```js
router.post('/products', (req, res) => {

  const filter = req.body.filters
  const alcolCG4 = filter.alcolCG4
  
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

        if(alcolCG4.length){
          console.log('alcolCG4 필터있다.');
          sql = upperSql;
          whereSql += " AND category4cd IN ( \n"
          alcolCG4.forEach(element => {
            whereSql += " '"+element+"', \n"
          });
          whereSql += 
            " '' \n"+
            ") \n"
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



###  주류 가격 검색 기능

* LandingPage.js
* product.js

#### LandingPage

```react
import React, { useEffect ,useState } from 'react'
import axios from 'axios';
import {AlcolCheckBox} from './Sections/AlcolCheckBox';

function LandingPage() {
    
    const [alcolFilter, setAlcolFilter] = useState([]);
    const [ALcolProcucts, setAlcolProducts] = useState([]); 
    const [AlcolFilters, setAlcolFilters] = useState({
    	continents: [],
        price: [],
        alcolCG4: [],
    });
    
    useEffect(() => {
        
 		let alcolBody = {
            filters : AlcolFilters 
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
    
        <AlcolPriceCheckBox list={alcolFilter} handleFilters={filters => alcolHandleFilters(alcolFilter, "alcolFilters")} />
        
        {renderALcolCards}
        
    )
        
}
```

#### product.js (라우터)

```js
router.post('/products', (req, res) => {

  const filter = req.body.filters
  const alcolCG4 = filter.alcolCG4
  
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

        if(price.length){
          whereSql += ' AND ( FALSE \n'
          console.log('가격있다.')
          price.forEach(([l,m],i) => {
            whereSql += "   OR regprice BETWEEN "+l+" AND "+m+" \n"
          })
          whereSql += ' ) \n '
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
