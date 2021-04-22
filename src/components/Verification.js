import { useEffect, useState } from "react"
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

const VERIFICATION_COUNT_NODE = "verificationCounts"

const verificationColumn = ({ upvote, downvote }) => ({
  title: "Verified?",
  key: "action-feedback",
  fixed: "right",
  width: 100,
  render: (r, record, index) => {
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
            onClick={() => upvote({ r, isChangingVote: alreadyVoted, index })}
            icon={alreadyVoted?.upvoted ? <UpvoteFilledIcon /> : <UpvoteIcon />}
          >
            {r.upvote}
          </Button>
          <Button
            className="vote-button downvote"
            disabled={alreadyVoted && alreadyVoted?.downvoted}
            onClick={() => downvote({ r, isChangingVote: alreadyVoted, index })}
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
  // sortDirections: ['ascend', 'descend', 'ascend'],
  // defaultSortOrder: 'ascend',
  // sorter: (a, b, sortOrder) => sortOrder === "descend" ? a.upvote - b.upvote : b.lastVoted - a.lastVoted
})

const Verification = ({ category, children, selectedState, dataSource }) => {
  const localStorageCounts = localStorage.getItem("votes")
    ? cella.get({ key: "votes" })
    : {}
  // fetch all by default
  let refToUse = db.ref(`${VERIFICATION_COUNT_NODE}/${category}`)
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState) {
    refToUse = db.ref(
      `${VERIFICATION_COUNT_NODE}/${category}/${toKebabCase(selectedState)}`
    )
  }
  const [dataWithCounts, setDataWithCounts] = useState([])

  // Only fetch counts once instead of keeping a watcher
  // we already have too many watchers and might affect reach the firebase limits
  // if we keep this also live
  useEffect(() => {
    if (!dataWithCounts.length && dataSource.length) {
      refToUse.once("value").then((s) => {
        const counts = s.val()
        // add verification counts in dataSource
        const dataWithCounts = dataSource
          .map((i) => {
            let field = counts?.[i.key]
            // if no state is selected, the structure is {[State]: {[key] : {upvote, downvote}}}
            if (!selectedState) {
              field = counts?.[toKebabCase(i.State)]?.[i.key]
            }
            return {
              ...i,
              upvote: field?.upvote ?? 0,
              downvote: field?.downvote ?? 0,
              lastVoted: field?.lastVoted ?? null,
              lastVotedType: field?.lastVotedType ?? null,
            }
          })
          .sort((a, b) => b.lastVoted - a.lastVoted)

        setDataWithCounts(dataWithCounts)
      })
    }
  }, [refToUse, dataWithCounts, dataSource, selectedState])

  // Update db and add to local dataWithCounts
  const vote = ({ r, ref, counts, type, index }) => {
    // update timestamp
    db.ref(ref).child("lastVoted").set(firebase.database.ServerValue.TIMESTAMP)
    db.ref(ref).child("lastVotedType").set(type)

    const common = { ...counts, lastVoted: new Date(), lastVotedType: type }
    const newDataWithCounts = [...dataWithCounts]
      newDataWithCounts[index] = {
        ...newDataWithCounts[index],
        ...common
      }
      
    setDataWithCounts(newDataWithCounts)

    // update local storage to note if user has already voted for an id
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

  const upvoteFn = ({ r, isChangingVote = false, index }) => {
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
      index
    })
  }

  const downvoteFn = ({ r, isChangingVote = false, index }) => {
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
      index
    })
  }

  return <>{children({ downvoteFn, upvoteFn, dataWithCounts })}</>
}

export default Verification
export { verificationColumn }
