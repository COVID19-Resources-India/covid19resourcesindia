import { useEffect, useState } from "react"
// antd
import { Button } from "antd"
// icons
import { ReactComponent as UpvoteIcon } from "assets/icons/upvote.svg"
import { ReactComponent as DownvoteIcon } from "assets/icons/downvote.svg"
// constants
import { db } from "constant/firebase"
// utils
import cella from "utils/cella"

const VERIFICATION_COUNT_NODE = "verificationCounts"

const verificationColumn = ({ upvote, downvote }) => ({
  title: "Working?",
  key: "action-feedback",
  fixed: "right",
  width: 100,
  render: (r) => {
    const localStorageCounts = cella.get({ key: "votes" })
    const alreadVoted = localStorageCounts[r.key]
    return (
      <div className="vote-wrapper">
        <Button
          className="vote-button"
          disabled={alreadVoted && alreadVoted?.upvoted}
          onClick={() => upvote({ r, isChangingVote: true })}
          icon={<UpvoteIcon />}
        >
          {r.upvote}
        </Button>
        <Button
          className="vote-button"
          disabled={alreadVoted && alreadVoted?.downvoted}
          onClick={() => downvote({ r, isChangingVote: true })}
          icon={<DownvoteIcon />}
        >
          {r.downvote}
        </Button>
      </div>
    )
  },
})

const Verification = ({ category, children, selectedState }) => {
  const localStorageCounts = cella.get({ key: "votes" })
  // fetch all by default
  let refToUse = db.ref(`${VERIFICATION_COUNT_NODE}/${category}`)
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState) {
    refToUse = db.ref(`${VERIFICATION_COUNT_NODE}/${category}/${selectedState}`)
  }
  const [verificationCounts, setVerificationCounts] = useState(undefined)

  // Only fetch counts once instead of keeping a watcher
  // we already have too many watchers and might affect reach the firebase limits
  // if we keep this also live
  useEffect(() => {
    if (verificationCounts === undefined) {
      refToUse.once("value").then((s) => {
        const counts = s.val()
        setVerificationCounts(counts)
      })
    }
  }, [refToUse, verificationCounts])

  // Update db and add to local verificationCounts
  const vote = ({ r, counts, type }) => {
    db.ref(`${VERIFICATION_COUNT_NODE}/${category}/${r.State}/${r.key}`).set(
      counts
    )
    setVerificationCounts((prev) => ({
      ...prev,
      [r.key]: counts,
    }))

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

  const upvoteFn = ({ r, isChangingVote = false }) => {
    let downvoteCount = r.downvote ?? 0
    // reduce downvote count if person is changing their vote
    if (isChangingVote) {
      downvoteCount = downvoteCount === 0 ? 0 : downvoteCount - 1
    }
    vote({
      r,
      counts: {
        upvote: r.upvote ? r.upvote + 1 : 1,
        downvote: downvoteCount,
      },
      type: "upvote",
    })
  }

  const downvoteFn = ({ r, isChangingVote = false }) => {
    let upvoteCount = r.upvote ?? 0
    // reduce upvote count if person is changing their vote
    if (isChangingVote) {
      upvoteCount = upvoteCount === 0 ? 0 : upvoteCount - 1
    }
    vote({
      r,
      counts: {
        upvote: upvoteCount,
        downvote: r.downvote ? r.downvote + 1 : 1,
      },
      type: "downvote",
    })
  }

  return <>{children({ downvoteFn, upvoteFn, verificationCounts })}</>
}

export default Verification
export { verificationColumn }
