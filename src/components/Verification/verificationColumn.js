// modules
import ReactTimeAgo from "react-time-ago"
// antd
import { Button } from "antd"
import confirm from "antd/lib/modal/confirm"
// icons
import { ReactComponent as UpvoteIcon } from "assets/icons/upvote.svg"
import { ReactComponent as DownvoteIcon } from "assets/icons/downvote.svg"
import { ReactComponent as UpvoteFilledIcon } from "assets/icons/upvote-filled.svg"
import { ReactComponent as DownvoteFilledIcon } from "assets/icons/downvote-filled.svg"
// utils
import cella from "utils/cella"

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

export { verificationColumn }
