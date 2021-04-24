import { useEffect, useState } from "react"
// constants
import firebase, { db } from "constant/firebase"
// utils
import cella from "utils/cella"
import { toKebabCase } from "utils/caseHelper"
// stlyes
import "./Verification.scss"
import { useFirebaseOnce } from "utils/hooksHelper"

const VERIFICATION_COUNT_NODE =
  process.env.NODE_ENV === "development"
    ? "verificationCountsDev"
    : "verificationCounts"

const Verification = ({
  category,
  children,
  dataSource,
  selectedState,
  shouldRefetchData,
}) => {
  const localStorageCounts = localStorage.getItem("votes")
    ? cella.get({ key: "votes" })
    : {}

  // fetch all by default
  let dbRef = db.ref(`${VERIFICATION_COUNT_NODE}/${category}`)
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState) {
    dbRef = db.ref(
      `${VERIFICATION_COUNT_NODE}/${category}/${toKebabCase(selectedState)}`
    )
  }

  const [dataWithCounts, setDataWithCounts] = useState(undefined)
  const { dataObj: fetchedVerificationCounts } = useFirebaseOnce(
    dbRef,
    shouldRefetchData
  )

  // merge and create dataWithCounts if verificationCounts or dataSource changes
  // required to be seperate from refetchVerification
  // --> dataSource should not never be out of sync with dataWithCounts
  useEffect(() => {
    if (dataSource) {
      const sortOrder = ["upvote", null, "downvote"]
      // add verification counts in dataSource
      let withCounts = dataSource
        ?.map((i) => {
          let field = fetchedVerificationCounts?.[i.key]
          // if no state is selected, the structure is {[State]: {[key] : {upvote, downvote}}}
          if (!selectedState) {
            field = fetchedVerificationCounts?.[toKebabCase(i.State)]?.[i.key]
          }
          return {
            ...i,
            upvote: field?.upvote ?? 0,
            downvote: field?.downvote ?? 0,
            lastVoted: field?.lastVoted ?? null,
            lastVotedType: field?.lastVotedType ?? null,
          }
        })
        .sort((a, b) => {
          // upvoted show on top of the list, then non-voted
          // downvoted show at the end of the list
          if (a.lastVotedType === b.lastVotedType) {
            return b.lastVoted - a.lastVoted
          } else {
            return (
              sortOrder.indexOf(a.lastVotedType) -
              sortOrder.indexOf(b.lastVotedType)
            )
          }
        })
      setDataWithCounts(withCounts)
    } else {
      setDataWithCounts([])
    }
  }, [dataSource, selectedState, fetchedVerificationCounts])

  // Update db and update dataWithCounts
  // dataWithCounts automatically updates and sorts based on vote count
  // if the data source / verification counts are updated
  const vote = ({ r, isChangingVote = false, type }) => {
    const state = toKebabCase(r.State)
    const ref = `${VERIFICATION_COUNT_NODE}/${category}/${state}/${r.key}`

    let counts = {
      upvote: r.upvote ? r.upvote : 0,
      downvote: r.downvote ? r.downvote : 0,
    }
    let refToDecrement = null
    if (type === "upvote") {
      counts.upvote = counts.upvote + 1
      // reduce downvote count if person is changing their vote
      if (isChangingVote) {
        counts.downvote = counts.downvote === 0 ? 0 : counts.downvote - 1
        refToDecrement = "downvote"
      }
    } else if (type === "downvote") {
      counts.downvote = counts.downvote + 1
      // reduce upvote count if person is changing their vote
      if (isChangingVote) {
        counts.upvote = counts.upvote === 0 ? 0 : counts.upvote - 1
        refToDecrement = "upvote"
      }
    }

    // decrement if changing votes
    if (refToDecrement) {
      db.ref(ref)
        .child(refToDecrement)
        .set(firebase.database.ServerValue.increment(-1))
    }

    // increment type (upvote/downvote) value
    db.ref(ref).child(type).set(firebase.database.ServerValue.increment(1))

    // update timestamp
    db.ref(ref).child("lastVoted").set(firebase.database.ServerValue.TIMESTAMP)
    db.ref(ref).child("lastVotedType").set(type)

    // update local verification counts
    setDataWithCounts((prev) => {
      const common = { ...counts, lastVoted: new Date(), lastVotedType: type }
      const newDataWithCounts = []

      for (const i in prev) {
        const dataRow = prev[i]
        if (dataRow.key === r.key) {
          newDataWithCounts.push({ ...dataRow, ...common })
        } else {
          newDataWithCounts.push(dataRow)
        }
      }
      return newDataWithCounts
    })

    // update local storage to note if user has already voted for an idUgh.
    cella.store({
      key: "votes",
      value: {
        ...localStorageCounts,
        [r.key]: {
          upvoted: type === "upvote",
          downvoted: type === "downvote",
        },
      },
    })
  }

  return (
    <>
      {children({
        downvoteFn: (p) => vote({ ...p, type: "downvote" }),
        upvoteFn: (p) => vote({ ...p, type: "upvote" }),
        dataWithCounts,
      })}
    </>
  )
}

export default Verification
