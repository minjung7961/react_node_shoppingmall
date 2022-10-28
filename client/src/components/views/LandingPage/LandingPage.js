import React, { useEffect ,useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row, Button, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import {CheckBox} from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox'
import SearchFeature from './Sections/SearchFeature';
import {continents, price} from './Sections/Datas';

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
    const [SearchTerm, setSearchTerm] = useState("");

    useEffect(() => {


        let body = {
            skip: Skip,
            limit: Limit
        }
        
        getProducts(body)

    },[])

    const getProducts = (body) => {

        Axios.post('/api/product/products', body)
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

    return (
        <div style={{ width: '75% ', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type='rocket'></Icon></h2>
            </div>

            {/* Filter */}
            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    <CheckBox list={ [1,2,3] } handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />     
                </Col>
            </Row>

            {/* Search */}
            <div style={{display: 'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
                <SearchFeature refreshFuction = {updateSearchTerm}/>
            </div>
            {/* Cards */}

            <Row gutter={[16,16]}>
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
