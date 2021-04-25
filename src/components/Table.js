import { useContext } from "react"
// antd
import { Empty, Table as AntDTable } from "antd"
// components
import Loader from "components/Loader"
import SearchInput from "components/SearchInput"
// styles
import "./Table.scss"
import { Link } from "react-router-dom"
// utils
import { useQuery } from "utils/hooksHelper"
import { toKebabCase } from "utils/caseHelper"
// context
import { StateContext } from "context/StateContext"

const NoDataFound = () => {
  const { selectedState } = useContext(StateContext)
  return (
    <Empty
      className="empty-table"
      description={
        <span>
          Sorry, we're still gathering sources for this category in your region.
          Meanwhile, you can check if there's something in&nbsp;
          <Link to={`/search/${toKebabCase(selectedState)}/external-resources`}>
            External Resources.
          </Link>
        </span>
      }
    />
  )
}

// Accepts datasource and columns and displays in table format
const Table = ({
  dataSource,
  columns,
  customComponent = null,
  loading = false,
  error = false,
  heading = "",
}) => {
  const query = useQuery()
  const searchTerm = query.get("q")

  let filteredData = []
  // Filter data based on the query search term
  if (searchTerm) {
    const newFilteredData = dataSource?.filter((entry) => {
      // Creating new object as the key can be deleted only in new object otherwise it'll delete from reference
      const newEntry = { ...entry }
      // Removing key from search
      delete newEntry.key
      const values = Object.values(newEntry)
      return values.find((value = "") =>
        // Looks like in some cases the data was having value as number
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    filteredData = newFilteredData
  } else {
    filteredData = dataSource
  }

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>An error occurred</p>
  }

  // We can also use a custom component if required for something
  if (customComponent) {
    return customComponent({ data: filteredData, heading })
  }

  return (
    <div className="query-result">
      <SearchInput searchTermFromQuery={searchTerm} />
      <AntDTable
        columns={columns}
        dataSource={filteredData}
        size="small"
        pagination={{
          defaultPageSize: 20,
          position: ["topCenter", "bottomCenter"],
        }}
        locale={{
          emptyText: <NoDataFound />,
        }}
      />
    </div>
  )
}

export default Table
