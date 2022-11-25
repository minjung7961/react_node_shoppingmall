You can watch the tutorial for this app.

https://www.youtube.com/channel/UCFyXA9x8lpL3EYWeYhj4C4Q?view_as=subscriber

# 장바구니 구현

* mariadb 에서 부터 얻은 id를 장바구니 기능 코드로 값을 넘긴다.

## 카트 코드(이전)



#### ProductInfo.js(이전)

```react
import React from 'react'
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../../_actions/user_actions';

function ProductInfo(props){

  const dispatch = useDispatch();

  const clickHandler = () => {
    // 필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(addToCart(props.detail._id))//
  }

  return(
    <div>
      <Button size='large' shape='round' type="danger" onClick={clickHandler}>
      	Add to Cart
      </Button>
    </div>
  )
}

export default ProductInfo
```

#### user_actions.js(이전)

```js
import axios from 'axios';
import {ADD_TO_CART} from './types';
import { USER_SERVER } from '../components/Config.js';

export function addToCart(id){

    let body = {
        productId : id
    }
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
    .then(response => response.data);
    return {
        type: ADD_TO_CART,
        payload: request
    }
}
```

#### type(이전)

```js
export const ADD_TO_CART = 'add_to_cart';
```

#### user(이전)

```js
router.post("/addToCart", auth, (req, res) => { //
    // 먼저 User Collection 에 해당 유저의 정보를 가져오기
    User.findOne({_id: req.user._id},
        (err, userInfo) => {
            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if(item.id === req.body.productId){
                    duplicate = true;
                }
            })
            // 상품이 이미 있을때
            if(duplicate){
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id" : req.body.productId},
                    {$inc:{"cart.$.quantity" : 1} },
                    {new: true},
                    (err, userInfo) => {
                        if(err) return res.status(400).json({ success:false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            // 상품이 이미 있지 않을때
            else{
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    {new : true },
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success:false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            
        })

});
```

#### user_reducer.js(이전)

```js
import {ADD_TO_CART} from '../_actions/types';
export default function(state={},action){
    switch(action.type){
        case ADD_TO_CART:
            return {...state,
                    userData: {
                        ...state.userData,
                        cart: action.payload
                    }
                   }
    }
}
```









## 알콜 카트 코드(이전)



#### ProductInfo.js(이전)

```react
import React from 'react'
import {useDispatch} from 'react-redux';
import {addToAlcolCart} from '../../../../_actions/user_actions';

function ProductInfo(props){

  const dispatch = useDispatch();

  const clickHandler = () => {
    // 필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(addToAlcolCart(props.detail._id))//
  }

  return(
    <div>
      <Button size='large' shape='round' type="danger" onClick={clickHandler}>
      	Add to Cart
      </Button>
    </div>
  )
}

export default ProductInfo
```

#### user_actions.js(이전)

```js
import axios from 'axios';
import {ALCOL_ADD_TO_CART} from './types';
import { USER_SERVER } from '../components/Config.js';

export function addToAlcolCart(id){

    let body = {
        productId : id
    }
    const request = axios.post(`${USER_SERVER}/alcolAddToCart`, body)
    .then(response => response.data);
    return {
        type: ALCOL_ADD_TO_CART,
        payload: request
    }
}
```

#### type(이전)

```js
export const ALCOL_ADD_TO_CART = 'alcol_add_to_cart';
```

## user(이전)

```js
router.post("/alcolAddToCart", auth, (req, res) => { //
    // 먼저 User Collection 에 해당 유저의 정보를 가져오기
    User.findOne({_id: req.user._id},
        (err, userInfo) => {
            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if(item.id === req.body.productId){
                    duplicate = true;
                }
            })
            // 상품이 이미 있을때
            if(duplicate){
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id" : req.body.productId},
                    {$inc:{"cart.$.quantity" : 1} },
                    {new: true},
                    (err, userInfo) => {
                        if(err) return res.status(400).json({ success:false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            // 상품이 이미 있지 않을때
            else{
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    {new : true },
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success:false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            
        })

});
```

#### user_reducer.js(이전)

```js
import {ADD_TO_CART} from '../_actions/types';
export default function(state={},action){
    switch(action.type){
        case ADD_TO_CART:
            return {...state,
                    userData: {
                        ...state.userData,
                        cart: action.payload
                    }
                   }
    	}
	}
```



## 추후에 할것

