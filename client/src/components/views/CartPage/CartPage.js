import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import {getCartItems} from '../../../_actions/user_actions.js';
import UserCardBlock from './sections/UserCardBlock';

function CartPage(props){
  const dispatch = useDispatch();

  useEffect(() => {

    let cartItem=[]
   
    // 리덕스 User state안에 cart 안에 상품이 들어있는지 확인
    if(props.user.userData && props.user.userData.cart){
      if(props.user.userData.cart.length > 0){
        props.user.userData.cart.forEach(item => {
          cartItem.push(item.id)
        })

        console.log(cartItem);
        dispatch(getCartItems(cartItem, props.user.userData.cart))
      }
    }

  }, [props.user.userData])

  return(
    <div style={{ width: '85%', margin: '3rem auto'}}>
      <h1>My Cart</h1>
      <div>
        {/* 너무 빠르게 product 값 잡으려 하니 안잡혀서 애러날때는 상위 프로퍼티도 같이 검사해서 넣자. */}
        <UserCardBlock products={props.user.cartDetail && props.user.cartDetail.product}/>
      </div>
      
    </div>
  )
}

export default CartPage