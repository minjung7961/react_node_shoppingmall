import React, { useEffect ,useState } from 'react'
import axios from 'axios';
import { Icon, Col, Card, Row, Button, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'; 
import AlcoholImageSlider from '../../utils/AlcoholImageSlider'; 
import {CheckBox} from './Sections/CheckBox';
import {AlcolCheckBox} from './Sections/AlcolCheckBox';
import Radiobox from './Sections/RadioBox'
import SearchFeature from './Sections/SearchFeature'; 
import AlcolSearchFeature from './Sections/AlcolSearchFeature';
import {continents, price, alcolPrice} from './Sections/Datas';

function LandingPage() {

    const [Product, setProducts] = useState([]); 
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(1);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
        alcolCG4: [],
    })
    const [AlcolFilters, setAlcolFilters] = useState({
        alcolCG4: [],
        price: []
    });
    const [SearchTerm, setSearchTerm] = useState("");
    const [ALcolSearchTerm, setALcolSearchTerm] = useState("");
    const [alcolFilter, setAlcolFilter] = useState([]);
    const [ALcolProcucts, setAlcolProducts] = useState([]); 

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit,
            filters : Filters
        }

        let alcolBody = {
            skip: Skip,
            limit: Limit,
            filters : AlcolFilters
        }
        
        getProducts(body)
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

    const getAlcolCategory = () => {
        axios.get('/api/data/cg4?cg3=0123020')
            .then(response => {
                if(response.data.success){
                    if(response.data.data && response.data.success){
                        setAlcolFilter(response.data.data);
                    }
                }
                    
            })
        .catch(err => alert(err));
    }

    const getProducts = (body) => { 

        axios.post('/api/product/products', body) 
            .then(response => { 
                if(response.data.success){ 
                    if(body.loadMore){
                        setProducts([...Product, ...response.data.productInfo]) 
                    }else{ 
                        setProducts(response.data.productInfo) 
                    } 
                    setPostSize(response.data.postSize); 
                }else{ 
                    alert("상품들을 가져오는데 실패 했습니다.") 
                } 
            }) 
    } 

    const loadMoreHandler = () => {
        

        let skip = Skip + Limit;

        let body = {
            skip : skip,
            limit : Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
        setLimit(Limit);
    }
    

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

    const renderALcolCards = ALcolProcucts.map((product, index) => {
        console.log('imgsrc : ', product.imgsrc);
        return <Col lg={6} md={8} xs={24} key={index}> 
            <Card 
                cover={ <a href={`/product/alc/${product.productid}`}>
                        <AlcoholImageSlider images={product.imgsrc} />  
                    </a> 
                }
            > 
                <Meta 
                    title={product.productnm}  
                    description={` ${product.regprice} 원`} 
                /> 
            </Card> 
        </Col> 
    }) 
    

    const showFilterResults = (filters) => {

        let body = {
            skip : 0,
            limit : Limit,
            filters : filters
        }
        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data){

            if(data[key]._id === parseInt(value,10)){
                array = data[key].array;
            }

        }
        return array;
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

    const AlcolUpdateSearchTerm = (newSearchTerm) => {
        

        let body = {
            filters : AlcolFilters,
            searchTerm : newSearchTerm
        }
        getAlcolProcuts(body)
        setALcolSearchTerm(newSearchTerm);

    }

    
    const handleFilters = async(filters, category) => {

        const newFilters = {...Filters}
        newFilters[category] = filters
        
        if(category === 'price'){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilterResults(newFilters)
        setFilters(newFilters)
    }

    const alcolShowFilterResults = (filters) => {

        let body = {
            filters : filters,
            searchTerm : ALcolSearchTerm
        }
        getAlcolProcuts(body)
    }
    
    const alcolHhandleFilters = async(alcolFilters, category) => {

        const newFilters = {...AlcolFilters}
        newFilters[category] = alcolFilters

        alcolShowFilterResults(newFilters)
        setAlcolFilters(newFilters)
    }


    return (
        <div style={{ width: '75% ', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center' }}>
                <h2>원하시는 제품을 선택해 주세요 <Icon type='rocket'></Icon></h2>
            </div>

            {/* Filter */}
            <Row gutter={[16,16]}>
                {/* <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col> */}
                <Col lg={12} xs={24}>
                    <AlcolCheckBox list={alcolFilter} header={"술종류"} handleFilters={alcolFilters => alcolHhandleFilters(alcolFilters, "alcolCG4")} />
                </Col>
                <Col lg={12} xs={24}>
                    <AlcolCheckBox list={alcolPrice} header={"가격"} handleFilters={alcolFilters => alcolHhandleFilters(alcolFilters, "price")} />
                </Col>
                {/* <Col lg={12} xs={24}>
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />     
                </Col> */}
            </Row>

            {/* Search */}
            <div style={{display: 'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
                {/* <SearchFeature refreshFuction = {updateSearchTerm}/> */}
                <AlcolSearchFeature refreshFuction = {AlcolUpdateSearchTerm}/>
            </div>
            {/* Cards */}

            <Row gutter={[16,16]}>
                {renderALcolCards} 
                {renderCards}
            </Row>
            
            <br />

            {PostSize >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            }


            
        </div>
    )
}

export default LandingPage
