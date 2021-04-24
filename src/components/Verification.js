import { useEffect, useState, useCallback } from "react"
// modules
import ReactTimeAgo from "react-time-ago"
// antd
import { Button } from "antd"
// icons
import { ReactComponent as UpvoteIcon } from "assets/icons/upvote.svg"
import { ReactComponent as DownvoteIcon } from "assets/icons/downvote.svg"
import { ReactComponent as UpvoteFilledIcon } from "assets/icons/upvote-filled.svg"
import { ReactComponent as DownvoteFilledIcon } from "assets/icons/downvote-filled.svg"
// constants
import firebase, { db } from "constant/firebase"
// utils
import cella from "utils/cella"
import { toKebabCase } from "utils/caseHelper"
// stlyes
import "./Verification.scss"
import confirm from "antd/lib/modal/confirm"
import { useFirebaseOnceHook } from "utils/hooksHelper"

const VERIFICATION_COUNT_NODE =
  process.env.NODE_ENV === "development"
    ? "verificationCountsDev"
    : "verificationCounts"

const showVoteConfirmation = ({ fn, type }) => {
  confirm({
    title: `Are you sure you want to ${type} this?`,
    onOk: fn,
  })
}

const verificationColumn = ({ upvote, downvote }) => ({
  title: "Verified?",
  key: "action-feedback",
  fixed: "right",
  width: 100,
  render: (r) => {
    const localStoragePresent = localStorage.getItem("votes")
    let localStorageCounts = {}
    if (localStoragePresent) {
      localStorageCounts = cella.get({ key: "votes" })
    }
    const alreadyVoted = localStorageCounts?.[r.key]
    return (
      <div className="vote-wrapper">
        <div className="vote-button-wrapper">
          <Button
            className="vote-button upvote"
            disabled={alreadyVoted && alreadyVoted?.upvoted}
            onClick={() =>
              showVoteConfirmation({
                fn: () => upvote({ r, isChangingVote: alreadyVoted }),
                type: "upvote",
              })
            }
            icon={alreadyVoted?.upvoted ? <UpvoteFilledIcon /> : <UpvoteIcon />}
          >
            {r.upvote}
          </Button>
          <Button
            className="vote-button downvote"
            disabled={alreadyVoted && alreadyVoted?.downvoted}
            onClick={() =>
              showVoteConfirmation({
                fn: () => downvote({ r, isChangingVote: alreadyVoted }),
                type: "downvote",
              })
            }
            icon={
              alreadyVoted?.downvoted ? (
                <DownvoteFilledIcon />
              ) : (
                <DownvoteIcon />
              )
            }
          >
            {r.downvote}
          </Button>
        </div>
        {r.lastVoted && (
          <div className="last-voted">
            <span className="label">Last {r.lastVotedType}:</span>
            <span className="value">
              {<ReactTimeAgo date={new Date(r.lastVoted)} locale="en-IN" />}
            </span>
          </div>
        )}
      </div>
    )
  },
})

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
  const { dataObj: fetchedVerificationCounts } = useFirebaseOnceHook(
    dbRef,
    shouldRefetchData
  )

  // Update db and update dataWithCounts
  // dataWithCounts automatically updates and sorts based on vote count
  // if the data source / verification counts are updated
  const vote = ({ r, ref, counts, type }) => {
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
            // If the elements both have the same `type`,
            return b.lastVoted - a.lastVoted // Compare by last voted time
          } else {
            // Otherwise,
            return (
              sortOrder.indexOf(a.lastVotedType) -
              sortOrder.indexOf(b.lastVotedType)
            ) // Substract indexes, If element `a` comes first in the array,
            // the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
          }
        })
      setDataWithCounts(withCounts)
    } else {
      setDataWithCounts([])
    }
  }, [dataSource, fetchedVerificationCounts])

  const upvoteFn = ({ r, isChangingVote = false }) => {
    const state = toKebabCase(r.State)
    const ref = `${VERIFICATION_COUNT_NODE}/${category}/${state}/${r.key}`

    let downvoteCount = r.downvote ?? 0
    // reduce downvote count if person is changing their vote
    if (isChangingVote) {
      downvoteCount = downvoteCount === 0 ? 0 : downvoteCount - 1
      db.ref(ref)
        .child("downvote")
        .set(firebase.database.ServerValue.increment(-1))
    }
    db.ref(ref).child("upvote").set(firebase.database.ServerValue.increment(1))

    vote({
      r,
      ref,
      counts: {
        upvote: r.upvote ? r.upvote + 1 : 1,
        downvote: downvoteCount,
      },
      type: "upvote",
    })
  }

  const downvoteFn = ({ r, isChangingVote = false }) => {
    const state = toKebabCase(r.State)
    const ref = `${VERIFICATION_COUNT_NODE}/${category}/${state}/${r.key}`
    let upvoteCount = r.upvote ?? 0
    // reduce upvote count if person is changing their vote
    if (isChangingVote) {
      upvoteCount = upvoteCount === 0 ? 0 : upvoteCount - 1
      db.ref(ref)
        .child("upvote")
        .set(firebase.database.ServerValue.increment(-1))
    }
    db.ref(ref)
      .child("downvote")
      .set(firebase.database.ServerValue.increment(1))

    vote({
      r,
      ref,
      counts: {
        upvote: upvoteCount,
        downvote: r.downvote ? r.downvote + 1 : 1,
      },
      type: "downvote",
    })
  }

  return <>{children({ downvoteFn, upvoteFn, dataWithCounts })}</>
}

export default Verification
export { verificationColumn }
