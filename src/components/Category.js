import { useParams } from "react-router-dom"
// constants
import { db } from "constant/firebase"
import {
  CATEGORIES,
  CATEGORIES_WITHOUT_VERIFICATION_COLUMN,
  CATEGORIES_WITH_NATIONAL,
  SPREADSHEET_KEY,
} from "constant/static"
import { DISCLAIMERS } from "constant/disclaimers"
// helper
import { toTitleCase } from "utils/caseHelper"
import { usePrevious, useFirebaseOnce } from "utils/hooksHelper"
// components
import { Verification, verificationColumn } from "components/Verification"
import NotFound from "components/NotFound"
// styles
import Table from "components/Table"
// columns
import {
  COLUMNS_PER_CATEGORY,
  DEFAULT_COLUMNS,
  buildColumns,
} from "constant/columns"
import "./Category.scss"

const CategoryComponent = ({ category, selectedState }) => {
  // fetch all by default
  let dbRef = db.ref(`${SPREADSHEET_KEY}/${category}`)
  let nationalRef = null
  const showVerificationColumn =
    CATEGORIES_WITHOUT_VERIFICATION_COLUMN.indexOf(category) === -1
  const callNational = CATEGORIES_WITH_NATIONAL.indexOf(category) > -1
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState && selectedState !== "All") {
    dbRef = db
      .ref(`${SPREADSHEET_KEY}/${category}`)
      .orderByChild("State")
      .equalTo(selectedState)

    if (callNational) {
      nationalRef = db
        .ref(`${SPREADSHEET_KEY}/${category}`)
        .orderByChild("State")
        .equalTo("National")
    }
  }

  const prevCategory = usePrevious(category)
  const prevSelectedState = usePrevious(selectedState)
  const shouldRefetchData =
    (prevCategory !== undefined && prevCategory !== category) ||
    (prevSelectedState !== undefined && prevSelectedState !== selectedState)

  const { data: dataSource = [], loading = false } = useFirebaseOnce(
    dbRef,
    shouldRefetchData
  )

  const {
    data: nationalData = [],
    loading: nationalDataLoading = false,
  } = useFirebaseOnce(nationalRef, shouldRefetchData)

  const preDefinedColumns = COLUMNS_PER_CATEGORY?.[category] ?? DEFAULT_COLUMNS
  // Update columns
  // -> Show state column
  //  if no state is selected
  //  if all states is selected
  // if the page calls national api - which means we need to show the state data.
  const columns = (!selectedState || selectedState === "All" || callNational)
    ? buildColumns(preDefinedColumns)
    : buildColumns(preDefinedColumns).filter((x) => x.key !== "State")

  return (
    <>
      {DISCLAIMERS && DISCLAIMERS[category] !== undefined ? (
        <div className="alert-block">{DISCLAIMERS[category]}</div>
      ) : null}
      <Verification
        category={category}
        dataSource={[...dataSource, ...nationalData]}
        selectedState={selectedState}
        shouldRefetchData={shouldRefetchData}
      >
        {(verificationProps) => {
          const { downvoteFn, upvoteFn, dataWithCounts } = verificationProps
          let updatedColumns = columns

          if (showVerificationColumn) {
            updatedColumns = [
              ...columns,
              verificationColumn({
                upvote: upvoteFn,
                downvote: downvoteFn,
              }),
            ]
          }

          return (
            <Table
              columns={updatedColumns}
              dataSource={dataWithCounts}
              loading={loading || nationalDataLoading}
            />
          )
        }}
      </Verification>
    </>
  )
}

// Fetches data for the category and displays in the antd table
const Category = () => {
  let { category, state } = useParams()

  if (!category) return null
  // Only fetch category from firebase if it is in the approved list of CATEGORIES
  if (!CATEGORIES.includes(toTitleCase(category))) {
    return <NotFound subTitle={`Requested category ${category} not found`} />
  }

  return (
    <section className="category">
      <CategoryComponent
        category={category}
        selectedState={toTitleCase(state)}
      />
    </section>
  )
}

export default Category
