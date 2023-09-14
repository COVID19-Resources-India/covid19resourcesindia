import { useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
// antd
import { Select } from "antd"
// constant
import { states } from "constant/states"
// context
import { StateContext } from "context/StateContext"
// helper
import { toKebabCase, toTitleCase } from "utils/caseHelper"
import "./StateSelector.scss"

const { Option } = Select

const StateSelector = () => {
  const { selectedState, setSelectedState } = useContext(StateContext)

  const location = useLocation()
  const history = useNavigate()
  const splitLocation = location.pathname.split("/")

  function onChange(value) {
    setSelectedState(value)
    // Update history params with selected state name
    if (splitLocation[1] === "search") {
      splitLocation[2] = toKebabCase(value)
      history.push(splitLocation.join("/"))
    }
  }

  // if query params have a state in it already
  // set selected state as that
  useEffect(() => {
    if (splitLocation[1] === "search") {
      if (splitLocation[2] !== toKebabCase(selectedState)) {
        setSelectedState(toTitleCase(splitLocation[2]))
      }
    }
  }, [selectedState, setSelectedState, splitLocation])

  return (
    <Select
      showSearch
      autoFocus
      defaultOpen={!selectedState}
      style={{ width: 200 }}
      placeholder="Select a state..."
      optionFilterProp="children"
      onChange={onChange}
      value={selectedState}
      className="state-selector"
    >
      <Option value="All">All States</Option>
      {states.map((i) => (
        <Option key={i} value={i}>
          {i}
        </Option>
      ))}
    </Select>
  )
}

export default StateSelector
