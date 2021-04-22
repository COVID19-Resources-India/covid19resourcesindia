import React from "react"

import "./Footer.scss"

export default function Header() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <p>
          This directory is a crowdsourced initiative aggregated by our
          extremely helpful volunteers. <br />
          We're in active development and we need all the help we can get right
          now. <br />
          If you'd like to volunteer to help, here's a{" "}
          <a
            href="https://www.notion.so/Contribution-Guide-fce10d02faa24865a96f4c720e53e1c4"
            target="_blank"
            rel="noreferrer"
          >
            quick guide
          </a>{" "}
          to help you get started.
        </p>
      </div>
    </footer>
  )
}
