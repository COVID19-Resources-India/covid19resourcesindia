import { useContext } from "react"
// antd
import { Select } from "antd"
// constant
import { states } from "constant/states"
// context
import { StateContext } from "context/StateContext"
import "./StateSelector.scss"

const { Option } = Select

const StateSelector = () => {
  const { selectedState, setSelectedState } = useContext(StateContext)

  function onChange(value) {
    // console.log(`selected ${value}`)
    setSelectedState(value)
  }

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a state..."
      optionFilterProp="children"
      onChange={onChange}
      value={selectedState}
      className="state-selector"
    >
      {states.map((i) => (
        <Option key={i} value={i}>
          {i}
        </Option>
      ))}
    </Select>
  )
}

export default StateSelector
