import React from 'react'
import {Button, Descriptions} from 'antd'
import {useDispatch} from 'react-redux';//
import {addToCart} from '../../../../_actions/user_actions';//
import {addToAlcolCart} from '../../../../_actions/user_actions';//

function ProductInfo(props){

  const dispatch = useDispatch();//

  const clickHandler = () => {
    console.log('clickHandler');
    dispatch(addToAlcolCart(props.detail.productid))
    // 필요한 정보를 Cart 필드에다가 넣어 준다.
    // dispatch(addToCart(props.detail._id))
    
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