import React, {useState}from "react"
import {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

function AlcolCheckBox(props){

  const [Checked, setChecked] = useState([]);

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
  
  const renderCheckboxList = () => {
    return props.list.map((value,index) => (
            <React.Fragment key={index}>
              <Checkbox onChange = {() => handleToggle(value._id)} 
                checked={Checked.indexOf(value._id) === -1 ? false : true}/>{value.name}
            </React.Fragment>
          ))
}

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header={props.header} key="0">       
          {renderCheckboxList()}
        </Panel>
        
      </Collapse>
    </div>
  )
}

export {AlcolCheckBox}
