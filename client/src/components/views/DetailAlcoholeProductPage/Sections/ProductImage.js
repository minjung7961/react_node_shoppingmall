import React, {useEffect, useState} from 'react'
import ReactImageGallery from 'react-image-gallery';

function ProductImage(props){

  const [Images, setImages] = useState([])

  useEffect(() => {
    if(props.detail.imgsrc){
      let images = []
        images.push({
          original: `https://cdn.aissgo1.com${props.detail.imgsrc}`
        })
      setImages(images);
    }else{
      
    }
  }, [props.detail])

  return(
    <div>
     <ReactImageGallery items={Images} />
    </div>
  )
}

export default ProductImage