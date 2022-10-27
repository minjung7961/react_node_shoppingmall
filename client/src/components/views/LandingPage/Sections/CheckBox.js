import React, {useState}from "react"
import {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

function CheckBox(props){

  const [Checked, setChecked] = useState([]);
  const [Filters,setFilters] = useState([]);
  const handleToggle = (value) => {

    const currentIndex = Checked.indexOf(value)
    const newChecked = [...Checked]

    if(currentIndex === -1){
      newChecked.push(value)
    }else{
      newChecked.splice(currentIndex,1)
    }
    
    setChecked(newChecked)
    props.handleFilters(newChecked)
  }


  const fromPro = async() => {
    let filters = await props.list
    console.log(filters); 
    filters.map((value,index) => (console.log(value)))
  }
  
  const renderCheckboxList = () => {
    fromPro()
    if(props.list[0]){
      return props.list.map((value,index) => (
              <React.Fragment key={index}>
                <Checkbox onChange = {() => handleToggle(value._id)} 
                  checked={Checked.indexOf(value._id) === -1 ? false : true}/>{value.name}
              </React.Fragment>
            ))
    }
    else{  
        return ['d','d'].map((value,index) => (
        <React.Fragment key={index}>
          <Checkbox>{value}</Checkbox>
        </React.Fragment>
      ))
    }
}

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Continents" key="0">       
          {renderCheckboxList()}
        </Panel>
        
      </Collapse>
    </div>
  )
}

export {CheckBox}
