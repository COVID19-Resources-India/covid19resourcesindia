import { useEffect, useState } from "react"
// antd
import { Empty, Input, Table as AntDTable } from "antd"
// components
import Loader from "components/Loader"
// icons
import { ReactComponent as SearchIcon } from "assets/icons/search.svg"
// styles
import "./Table.scss"
import { Link } from "react-router-dom"

// Accepts datasource and columns and displays in table format
const Table = ({
  dataSource,
  columns,
  customComponent = null,
  loading = false,
  error = false,
  heading = "",
  resetSearch = false,
}) => {
  const [searchedValue, setSearchedValue] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const newFilteredData = dataSource.filter((entry) => {
      // Creating new object as the key can be deleted only in new object otherwise it'll delete from reference
      const newEntry = { ...entry }
      // Removing key from search
      delete newEntry.key
      const values = Object.values(newEntry)
      return values.find((value = "") =>
        // Looks like in some cases the data was having value as number
        value?.toString().toLowerCase().includes(searchedValue.toLowerCase())
      )
    })
    if (searchedValue) setFilteredData(newFilteredData)
    else setFilteredData(dataSource)
  }, [dataSource, searchedValue])

  useEffect(() => {
    // If datasource changes i.e routes change, reset the search in case of external resources so that the empty box is not seen in that case.
    if (resetSearch) {
      setSearchedValue("")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])

  const onSearchChange = (e) => setSearchedValue(e.target.value)

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
      <Input
        className="filter-box"
        placeholder="Start typing here to filter results..."
        suffix={<SearchIcon />}
        onChange={onSearchChange}
        value={searchedValue}
      />
      <AntDTable
        columns={columns}
        dataSource={filteredData}
        size="small"
        pagination={{
          defaultPageSize: 20,
          position: ["topCenter", "bottomCenter"],
        }}
        locale={{
          emptyText: (
            <Empty
              className="empty-table"
              description={
                <span>
                  Sorry, we're still gathering sources for this category in your
                  region. Meanwhile, you can check if there's something in&nbsp;
                  <Link to="/search/external-resources">
                    External Resources.
                  </Link>
                </span>
              }
            />
          ),
        }}
      />
    </div>
  )
}

export default Table
