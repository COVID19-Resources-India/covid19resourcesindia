import { useParams } from "react-router-dom"
// constants
import { db } from "constant/firebase"
import { CATEGORIES, SPREADSHEET_KEY } from "constant/static"
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
import { useEffect } from "react"

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
    <>
      {DISCLAIMERS && DISCLAIMERS[category] !== undefined ? (
        <div className="alert-block">{DISCLAIMERS[category]}</div>
      ) : null}
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
            <Table
              columns={updatedColumns}
              dataSource={dataWithCounts}
              loading={loading}
            />
          )
        }}
      </Verification>
    </>
  )
}

// Fetches data for the category and displays in the antd table
const Category = ({ sectionRef, scrollToRef }) => {
  let { category, state } = useParams()

  useEffect(() => {
    scrollToRef()
  })

  if (!category) return null
  // Only fetch category from firebase if it is in the approved list of CATEGORIES
  if (!CATEGORIES.includes(toTitleCase(category))) {
    return <NotFound subTitle={`Requested category ${category} not found`} />
  }

  return (
    <section ref={sectionRef} className="category">
      <CategoryComponent
        category={category}
        selectedState={toTitleCase(state)}
      />
    </section>
  )
}

export default Category
