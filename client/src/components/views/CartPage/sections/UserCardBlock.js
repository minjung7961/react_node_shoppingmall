import React from 'react'
import "./UserCardBlock.css"
import {Button} from 'antd'
function UserCardBlock(props){

  const renderCartImage = (images) => {
    if(images.length > 0){
      let image = images[0]
      return `http://localhost:5000/${image}`
    }
  }

  const renderItems = () => (
    props.products && props.products.map((product,index) => (
      <tr key={index}>
        <td>
          <img style={{ width: '70px' }} alt="product" src={renderCartImage(product.images)} />
        </td>
        <td>
          {product.quantity} 개
        </td>
        <td>
          {product.price} 원
        </td>
        <td>
          <button onClick={() => props.removeItem(product._id)}>
            제거
          </button>
        </td>
      </tr>
      ))
    )

  return(
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>시간</th>
              <th>결제자</th>
              <th>금액</th>
              <th>물품</th>
              <th>배송조회</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2022-11-22 15:15:00</td>
              <td>김민정</td>
              <td>12000</td>
              <td><Button>물품보기</Button></td>
              <td><Button>배송조회</Button></td>
            </tr>
            <tr>
              <td>2022-11-22 15:15:00</td>
              <td>김민정</td>
              <td>12000</td>
              <td><Button>물품보기</Button></td>
              <td><Button>배송조회</Button></td>
            </tr>
            <tr>
              <td>2022-11-22 15:15:00</td>
              <td>김민정</td>
              <td>12000</td>
              <td><Button>물품보기</Button></td>
              <td><Button>배송조회</Button></td>
            </tr>
            {/* {renderItems()} */}

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UserCardBlock