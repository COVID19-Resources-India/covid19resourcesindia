import { useEffect, useState } from "react"
// antd
import { Button } from "antd"
// icons
import { ReactComponent as UpvoteIcon } from "assets/icons/upvote.svg"
import { ReactComponent as DownvoteIcon } from "assets/icons/downvote.svg"
// constants
import { db } from "constant/firebase"

const VERIFICATION_COUNT_NODE = "verificationCounts"

const verificationColumn = ({ upvote, downvote }) => ({
  title: "Working?",
  key: "action-feedback",
  fixed: "right",
  width: 100,
  render: (r) => (
    <div className="vote-wrapper">
      <Button
        className="vote-button"
        onClick={() => upvote(r)}
        icon={<UpvoteIcon />}
      >
        {r.upvote}
      </Button>
      <Button
        className="vote-button"
        onClick={() => downvote(r)}
        icon={<DownvoteIcon />}
      >
        {r.downvote}
      </Button>
    </div>
  ),
})

const Verification = ({ category, children, selectedState }) => {
  // fetch all by default
  let refToUse = db.ref(`${VERIFICATION_COUNT_NODE}/${category}`)
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState) {
    refToUse = db.ref(`${VERIFICATION_COUNT_NODE}/${category}/${selectedState}`)
  }
  const [verificationCounts, setVerificationCounts] = useState(undefined)
  useEffect(() => {
    if (verificationCounts === undefined) {
      refToUse.once("value").then((s) => {
        const counts = s.val()
        setVerificationCounts(counts)
      })
    }
  }, [refToUse, verificationCounts])

  const upvoteFn = (r) => {
    db.ref(`${VERIFICATION_COUNT_NODE}/${category}/${r.State}/${r.key}`).set({
      upvote: r.upvote ? r.upvote + 1 : 1,
      downvote: r.downvote ?? 0,
    })
  }

  const downvoteFn = (r) => {
    db.ref(`${VERIFICATION_COUNT_NODE}/${category}/${r.State}/${r.key}`).set({
      upvote: r.upvote ?? 0,
      downvote: r.downvote ? r.downvote + 1 : 1,
    })
  }

  return <>{children({ downvoteFn, upvoteFn, verificationCounts })}</>
}

export default Verification
export { verificationColumn }
