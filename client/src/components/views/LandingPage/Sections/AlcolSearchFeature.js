import React, { useState } from 'react'
import { Input } from 'antd';

const {Search} = Input;

function AlcolSearchFeature(props){

  const [SearchTerm, setSearchTerm] = useState("")

  const searchHandler = (event) => {
    setSearchTerm(event.currentTarget.value)
    props.refreshFuction(event.currentTarget.value)
  }
  return(
    <div>
      <Search
      placeholder="제품 이름"
      onChange={searchHandler}
      style={{
        width: 200,
      }}
      value={SearchTerm}
    />
    </div>
  )
}

export default AlcolSearchFeature