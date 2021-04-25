import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
// antd
import { Input } from "antd"
// icons
import { ReactComponent as SearchIcon } from "assets/icons/search.svg"

const SearchInput = ({ searchTermFromQuery }) => {
  const [query, setQuery] = useState(searchTermFromQuery)
  const history = useHistory()

  const onChange = (e) => setQuery(e.target.value)

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) {
      params.append("q", query)
    } else {
      params.delete("q")
    }
    history.push({ search: params.toString() })
  }, [query, history])

  return (
    <Input
      className="filter-box"
      placeholder="Start typing here to filter results..."
      suffix={<SearchIcon />}
      onChange={onChange}
      value={query}
    />
  )
}

export default SearchInput
