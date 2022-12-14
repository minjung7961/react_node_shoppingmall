import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART, 
    ALCOL_ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ALCOL_LOGIN_USER
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data );
    
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function alcolLoginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/alcolLogin`,dataToSubmit)
                .then(response => response.data);

    return {
        type: ALCOL_LOGIN_USER,
        payload: request
    }
}

export function alcolAuth(){
    const request = axios.get(`${USER_SERVER}/alcolAuth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id){
    console.log('addToCart');
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

export function addToAlcolCart(id){
    console.log('addToAlcolCart');
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


export function getCartItems(cartItems, userCart){
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then(response =>{
        // CartItem?????? ???????????? ????????????
        // Product Collection ?????? ????????? ??????
        //Quantity ????????? ?????? ??????

        userCart.forEach(cartItem => {
            response.data.forEach((productDetail, index) => {

                if(cartItem.id === productDetail._id){
                    response.data[index].quantity = cartItem.quantity
                }

            })
        })
        return response.data;
    });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId){
    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
    .then(response =>{
        
        //productInfo, cart ????????? ???????????? CartDetail??? ?????????.
        response.data.cart.forEach(item => {
            response.data.productInfo.forEach((product, index) => {
                if(item.id === product._id){
                    response.data.productInfo[index].quantity = item.quantity
                }
            })
        })
        return response.data;
    });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}
