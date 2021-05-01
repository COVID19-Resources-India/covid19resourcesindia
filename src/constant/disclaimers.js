import { Link } from "react-router-dom"

const sourcesLink = (
  <div>
    👥 &nbsp;These records are crowd-sourced from the internet and have{" "}
    <strong>not</strong> been verified by us. You can check{" "}
    <Link to="/sources">our sources here</Link>.
  </div>
)

const upvoteRequest = (
  <div>
    👍 &nbsp;Please <strong>upvote / downvote</strong> if you found it useful or
    not. This will help others.
  </div>
)

const scamDisclaimer = (
  <div>
    ❗ &nbsp;There have been reports of <strong>scams</strong> and black market
    transactions. Please be careful. It might be a scam if they are asking to
    pre-pay.
  </div>
)

const DISCLAIMERS = {
  remdesivir: (
    <>
      <div>
        💊 &nbsp;Please note that Remdesivir is not a life saving drug for
        COVID-19. It is to be administered in hospitals only.
      </div>
      <br />
      <div>
        ℹ️ &nbsp;According to government guidelines Remdesivir can{" "}
        <strong>only be sold to private and state COVID hospitals</strong>.
        Please reach out to your district collectors office as they can send the
        medicine to the hospital.
      </div>
      <br />
      {scamDisclaimer}
    </>
  ),
  tocilizumab: (
    <>
      {sourcesLink}
      <br />
      {scamDisclaimer}
      <br />
      {upvoteRequest}
    </>
  ),
  "oxygen-cylinders": (
    <>
      {sourcesLink}
      <br />
      {scamDisclaimer}
      <br />
      {upvoteRequest}
    </>
  ),
  beds: <>{upvoteRequest}</>,
}

export { DISCLAIMERS }
