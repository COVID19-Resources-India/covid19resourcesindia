// firebase
import { useList } from "react-firebase-hooks/database"
// antd
import { Button } from "antd"
// icons
import { ReactComponent as UpvoteIcon } from "assets/icons/upvote.svg"
import { ReactComponent as DownvoteIcon } from "assets/icons/downvote.svg"
// constants
import { db } from "constant/firebase"

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
  let refToUse = db.ref(`verificationCounts/${category}`)
  // if state is selected in the context (from the header)
  // filter based on state
  if (selectedState) {
    refToUse = db.ref(`verificationCounts/${category}/${selectedState}`)
  }
  const [snapshots] = useList(refToUse)

  const verificationCounts = {}
  if (snapshots && snapshots.length > 0) {
    for (const snapshot of snapshots) {
      verificationCounts[snapshot.key] = snapshot.val()
    }
  }

  const upvoteFn = (r) => {
    console.log("upvote", category, selectedState, r.State, r.key)
  }

  const downvoteFn = (r) => {
    console.log("downvote", category, selectedState, r.State, r.key)
  }

  return <>{children({ verificationCounts, upvoteFn, downvoteFn })}</>
}

export default Verification
export { verificationColumn }
