import React from 'react'
import { Icon, Col, Card, Row, Button, Carousel } from 'antd';

function ImageSlider( props ){
  return (
    <div>
      <Carousel autoplay>
          <div>
            <center><img style={{ maxHeight: '150px' }} src={`https://cdn.aissgo1.com${props.images}`}/></center>
          </div>
      </Carousel>
    </div>
  )
}

export default ImageSlider