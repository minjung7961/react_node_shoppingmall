import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import {getCartItems,removeCartItem} from '../../../_actions/user_actions.js';
import UserCardBlock from './sections/UserCardBlock';
import { Empty } from 'antd';


function CartPage(props){
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);

  useEffect(() => {

    let cartItem=[]
   
    // 리덕스 User state안에 cart 안에 상품이 들어있는지 확인
    if(props.user.userData && props.user.userData.cart){
      if(props.user.userData.cart.length > 0){
        props.user.userData.cart.forEach(item => {
          cartItem.push(item.id)
        })
        dispatch(getCartItems(cartItem, props.user.userData.cart))
          .then(response => {calculateTotal(response.payload)})
      }
    }

  }, [props.user.userData])

  let calculateTotal = (cartDetail) =>{
    let total = 0;

    cartDetail.map(item => {
      total += parseInt(item.price) * parseInt(item.quantity)
    })

    setTotal(total);
    setShowTotal(true)
  }

  let remoneFromCart = (productId) => {
      dispatch(removeCartItem(productId))
      .then(response => {
        if(response.payload.productInfo.length <= 0){
          setShowTotal(false)
        }
      })
  }

  return(
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <h1>My Cart</h1>
      <div>
        {/* 너무 빠르게 product 값 잡으려 하니 안잡혀서 애러날때는 상위 프로퍼티도 같이 검사해서 넣자. */}
        <UserCardBlock products={props.user.cartDetail} removeItem={remoneFromCart}/>
      </div>

      {ShowTotal ? 
        <>
          <div style={{ marginTop: '3rem'}}>
            <h2>Total Amount : ${Total}</h2>
          </div>
          <button>결제하기</button>
        </>
        :
        <>
          <br />
            <Empty description={false}/>
          <div style={{ marginTop: '3rem'}}>
            <h2>선택한 상품이 없습니다. </h2>
          </div>
        </>
      }
      
    </div>
  )
}

export default CartPage