// hooks
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useList } from "react-firebase-hooks/database"
// antd
import { Result, Button, Table, Input } from "antd"
// constants
import { db } from "constant/firebase"
import { CATEGORIES, SPREADSHEET_KEY } from "constant/static"
// context
import { StateContext } from "context/StateContext"
// helper
import { toTitleCase } from "utils/caseHelper"
// components
import Loader from "components/Loader"
// icons
import { ReactComponent as SearchIcon } from "assets/icons/search.svg"
import { ReactComponent as UpvoteIcon } from "assets/icons/upvote.svg"
import { ReactComponent as DownvoteIcon } from "assets/icons/downvote.svg"
// styles
import "./Category.scss"

const COLUMNS = [
  {
    title: "State",
    dataIndex: "State",
    key: "State",
  },
  {
    title: "Distributor Name",
    dataIndex: "Distributor Name",
    key: "Distributor Name",
  },
  {
    title: "Telephone",
    dataIndex: "Telephone",
    key: "Telephone",
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
  },
  {
    title: "E-Mail Address",
    dataIndex: "E-Mail Address",
    key: "E-Mail Address",
  },
  {
    title: "Working?",
    key: "action-feedback",
    fixed: "right",
    width: 100,
    render: () => (
      <div className="vote-wrapper">
        <Button className="vote-button" icon={<UpvoteIcon />}>
          12
        </Button>
        <Button className="vote-button" icon={<DownvoteIcon />}>
          2
        </Button>
      </div>
    ),
  },
]

const CategoryComponent = ({ category, stateContext }) => {
  const { selectedState } = stateContext

  // fetch all by default
  let refToUse = db.ref(`${SPREADSHEET_KEY}/${category}`)
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState) {
    refToUse = db
      .ref(`${SPREADSHEET_KEY}/${category}`)
      .orderByChild("State")
      .equalTo(selectedState)
  }
  const [snapshots, loading, error] = useList(refToUse)
  const [searchedValue, setSearchedValue] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const dataSource = snapshots.map((i) => i.val())
    const newFilteredData = dataSource.filter((entry) => {
      delete entry.key // Removing key from search
      const values = Object.values(entry)
      return values.find((value = "") =>
        // Looks like in some cases the data was having value as number
        value.toString().toLowerCase().includes(searchedValue.toLowerCase())
      )
    })
    if (searchedValue) setFilteredData(newFilteredData)
    else setFilteredData(dataSource)
  }, [snapshots, searchedValue])

  // TOOD: Show a loading spinner
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>An error occurred</p>
  }

  // Update columns
  // -> Show state column if no state is selected
  const columns = !selectedState
    ? COLUMNS
    : COLUMNS.filter((x) => x.key !== "State")

  const onSearchChange = (e) => {
    const currValue = e.target.value
    setSearchedValue(currValue)
  }

  return (
    <div className="query-result">
      <Input
        className="filter-box"
        placeholder="Start typing here to filter results..."
        suffix={<SearchIcon />}
        onChange={onSearchChange}
        value={searchedValue}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        size="small"
        pagination={{
          defaultPageSize: 20,
          position: ["topCenter", "bottomCenter"],
        }}
      />
    </div>
  )
}

// Fetches data for the category and displays in the antd table
const Category = () => {
  const history = useHistory()
  let { category } = useParams()

  const stateContext = useContext(StateContext)
  const { loadingState } = stateContext

  // Only fetch category from firebase if it is in the approved list of CATEGORIES
  if (!CATEGORIES.includes(toTitleCase(category))) {
    return (
      <Result
        status="404"
        title="404"
        subTitle={`Requested category ${category} not found`}
        extra={
          <Button onClick={() => history.push("/")} type="primary">
            Back Home
          </Button>
        }
      />
    )
  }
  if (loadingState) {
    // Loading when state being fetched from geolocation
    return <Loader />
  } else {
    return <CategoryComponent category={category} stateContext={stateContext} />
  }
}

export default Category
