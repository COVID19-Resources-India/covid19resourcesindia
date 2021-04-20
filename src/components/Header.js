import React, { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg"
import { ReactComponent as GithubIcon } from "assets/icons/github.svg"
import MobileMenu from "components/MobileMenu"
import StateSelector from "components/StateSelector"
import _ from "lodash"

import "./Header.scss"

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", _.throttle(handleScroll, 100))
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const handleScroll = () => {
    window.pageYOffset > "64" ? setIsSticky(true) : setIsSticky(false)
  }
  // TODO: Figure out Submit Information, Contribute, Report URLs
  return (
    <header id="header" className={`header ${isSticky ? "sticky" : ""}`}>
      <div className="wrapper">
        <StateSelector />
        <Link to="/" className="logo">
          COVID-19 Resources<span>India</span>
        </Link>
        <nav className="navigation">
          <a
            href="https://forms.gle/rrbpk9SzGFmxbFpX9"
            target="_blank"
            rel="noreferrer"
            className="item"
          >
            Submit Information
          </a>
          <a
            href="https://bit.ly/32vqT5O"
            target="_blank"
            rel="noreferrer"
            className="item"
          >
            Contribute
          </a>
          <a
            href="https://github.com/COVID19-Resources-India/covid19resourcesindia/issues"
            target="_blank"
            rel="noreferrer"
            className="item"
          >
            Report an Issue
          </a>
          <a
            href="https://t.me/covid19resourcesindia"
            className="item"
            target="_blank"
            rel="noreferrer"
          >
            <TelegramIcon />
          </a>
          <a
            href="https://github.com/COVID19-Resources-India/covid19resourcesindia"
            className="item"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
        </nav>
        <MobileMenu />
      </div>
    </header>
  )
}
