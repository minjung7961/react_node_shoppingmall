import React from 'react'
import {Button, Descriptions,InputNumber} from 'antd'
import {useDispatch, useSelector} from 'react-redux';//
import {addToCart} from '../../../../_actions/user_actions';//
import {addToAlcolCart} from '../../../../_actions/user_actions';//

function ProductInfo(props){

  const dispatch = useDispatch();//
  if(props.userData){
    console.log(props.userData.alcolId);
  }
  
  const clickHandler = () => {
    console.log('clickHandler');
    // dispatch(addToAlcolCart(props.detail.productid))
    // 필요한 정보를 Cart 필드에다가 넣어 준다.
    // dispatch(addToCart(props.detail._id))
    console.log(props.detail)
    alert('추가되었습니다.');
    
  }
  
  const onclick = (value) => {
    console.log('갯수 핸들링 함수 ')
    console.log(value);
  }
  return(
    <div>
      <Descriptions title="장바구니 넣을 정보" layout="vertical" bordered>
        <Descriptions.Item label="가격">{props.detail.regprice}</Descriptions.Item>
        <Descriptions.Item label="갯수"><InputNumber min={1} max={10} defaultValue={1} onChange={onclick}/></Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />
      <div style={{ display:'flex', justifyContent: 'center' }}>
        <Button size='large' shape='round' type="danger" onClick={clickHandler}>
          장바구니 추가하기
        </Button>

      </div>
    </div>
  )
}

export default ProductInfo