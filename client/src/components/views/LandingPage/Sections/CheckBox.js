import React, {useState}from "react"
import {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

function CheckBox(props){

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

  const renderCheckboxList = () => props.list && props.list.map((value,index) => (
    <React.Fragment key={index}>
      <Checkbox onChange = {() => handleToggle(value._id)} 
        checked={Checked.indexOf(value._id) === -1 ? false : true}/>{value.name}
    </React.Fragment>
  ))

  const renderPromiseList = async () => {
    const filter = await props.list

    filter.map((value,index) => {
      console.log(value)
    })
  }
  
  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Continents" key="0">
          
        {renderCheckboxList()}
        {/* {renderPromiseList()} */}
        
        </Panel>
        
      </Collapse>
    </div>
  )
}

export {CheckBox}
