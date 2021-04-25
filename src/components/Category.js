// hooks
import { Fragment } from "react"
import { useHistory, useParams } from "react-router-dom"
// antd
import { Result, Button } from "antd"
// constants
import { db } from "constant/firebase"
import { CATEGORIES, SPREADSHEET_KEY } from "constant/static"
// helper
import { toTitleCase } from "utils/caseHelper"
import { usePrevious, useFirebaseOnce } from "utils/hooksHelper"
// components
import { Verification, verificationColumn } from "components/Verification"
// styles
import Table from "components/Table"
// columns
import {
  COLUMNS_PER_CATEGORY,
  DEFAULT_COLUMNS,
  buildColumns,
} from "constant/columns"
import TwitterSearch from "./TwitterSearch"

const CategoryComponent = ({ category, selectedState }) => {
  // fetch all by default
  let dbRef = db.ref(`${SPREADSHEET_KEY}/${category}`)
  const isExternalResources = category === "external-resources"
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState && selectedState !== "All" && !isExternalResources) {
    dbRef = db
      .ref(`${SPREADSHEET_KEY}/${category}`)
      .orderByChild("State")
      .equalTo(selectedState)
  }

  const prevCategory = usePrevious(category)
  const prevSelectedState = usePrevious(selectedState)
  const shouldRefetchData =
    (prevCategory !== undefined && prevCategory !== category) ||
    (prevSelectedState !== undefined && prevSelectedState !== selectedState)

  const { data: dataSource, loading } = useFirebaseOnce(
    dbRef,
    shouldRefetchData
  )

  const preDefinedColumns = COLUMNS_PER_CATEGORY?.[category] ?? DEFAULT_COLUMNS
  // Update columns
  // -> Show state column if no state is selected
  const columns =
    !selectedState || isExternalResources
      ? buildColumns(preDefinedColumns)
      : buildColumns(preDefinedColumns).filter((x) => x.key !== "State")

  return (
    <Verification
      category={category}
      dataSource={dataSource}
      selectedState={selectedState}
      shouldRefetchData={shouldRefetchData}
    >
      {(verificationProps) => {
        const { downvoteFn, upvoteFn, dataWithCounts } = verificationProps
        let updatedColumns = columns

        if (!isExternalResources) {
          updatedColumns = [
            ...columns,
            verificationColumn({
              upvote: upvoteFn,
              downvote: downvoteFn,
            }),
          ]
        }

        return (
          <Fragment>
            <TwitterSearch category={category} />
            <Table
              columns={updatedColumns}
              dataSource={dataWithCounts}
              loading={loading}
            />
          </Fragment>
        )
      }}
    </Verification>
  )
}

// Fetches data for the category and displays in the antd table
const Category = () => {
  const history = useHistory()
  let { category, state } = useParams()

  if (!category) return null
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

  return (
    <CategoryComponent category={category} selectedState={toTitleCase(state)} />
  )
}

export default Category
