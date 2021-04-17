// hooks
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { useList } from "react-firebase-hooks/database"
// antd
import { Table } from "antd"
// constants
import { db } from "constant/firebase"
import { SPREADSHEET_KEY } from "constant/static"
// context
import { StateContext } from "context/StateContext"

const columns = [
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
    title: "E-Mail Address",
    dataIndex: "E-Mail Address",
    key: "E-Mail Address",
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
]

// Fetches data for the category and displays in the antd table
const Category = () => {
  let { category } = useParams()
  const { selectedState } = useContext(StateContext)

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
  const dataSource = snapshots.map((i) => i.val())

  // TOOD: Show a loading spinner
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>An error occurred</p>
  }

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default Category
