import { useCallback, useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

/**
 *
 * Fetches data from firebase .once('value)
 * @param {*} dbRef String: ref to fetch from
 * @param {*} shouldRefetchData Boolean: condition when data should be refetched
 * @returns
 * {
 *   data: Array: [{ key, ...values }]
 *   dataObj: Object {key: val, ...}
 *   loading: Boolean
 * }
 */
function useFirebaseOnce(dbRef, shouldRefetchData) {
  const [data, setData] = useState(undefined)
  const [dataObj, setDataObj] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(() => {
    setLoading(true)
    dbRef.once("value").then((s) => {
      // console.log("&& fetched", s.val())
      const vals = s.val()
      if (vals) {
        setData(Object.keys(vals).map((key) => vals[key]))
        setDataObj(s.val())
      } else {
        setData([])
        setDataObj({})
      }
      setLoading(false)
    })
  }, [dbRef])

  // init fetch
  useEffect(() => {
    if (data === undefined && !loading) {
      // console.log("initial fetch data")
      fetchData()
    }
  }, [loading, data, fetchData])

  // refetch data when condition is passed
  useEffect(() => {
    if (shouldRefetchData) {
      // console.log("refetch data")
      fetchData()
    }
  }, [shouldRefetchData, fetchData])

  return { data, dataObj, loading }
}

// Ref: https://reactrouter.com/web/example/query-parameters
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export { usePrevious, useQuery, useFirebaseOnce }
